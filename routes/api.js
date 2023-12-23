const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const OpenAI = require('openai');
const Summoner = require('../models/summoner');
const LiveGame = require('../models/liveGame');


const RIOT_API_KEY = process.env.RIOT_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const championIDs = require('../data/champions.json');
const championPowers = require('../data/champion_powers.json');

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 40,
  handler: function (req, res) {
      const retryAfter = Math.ceil(req.rateLimit.resetTime - Date.now()) / 1000;
      console.warn(`Rate limit exceeded for ${req.ip}`);
      res.status(429).json({
          message: "Too many requests, please try again later.",
          retryAfter: retryAfter
      });
  }
});

router.use(apiLimiter);

router.post('/search-game', async (req, res) => {
  const maxAttempts = 5;
  let attempts = 0;
  const searchGameInterval = async () => {
    if (attempts >= maxAttempts) {
      return res.status(408).send('Max retry attempts reached');
    }
    try {
      const { region, summonerId } = req.body;
      const searchGame = await axios.get(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`);
      if(searchGame && searchGame.status === 200) {
        let red_team = [];
        let blue_team = [];
        let team_color = "";
        let enemy_color = "";
        let jungler_blue = null;
        let jungler_red = null;
        let blue_team_power = [0,0,0,0,0];
        let red_team_power = [0,0,0,0,0];
        for (let i = 0; i < searchGame.data.participants.length; i++) {
          let participant = searchGame.data.participants[i];
          let championId = championIDs[participant.championId];
          let championPower = championPowers[championId];
          if (i < 5) {
              blue_team.push(championId);
              for (let i = 0; i < championPower.length; i++) {
                blue_team_power[i] += championPower[i] * 2;
              }
          } else {
              red_team.push(championId);
              for (let i = 0; i < championPower.length; i++) {
                red_team_power[i] += championPower[i] * 2;
              }
          }
          if (participant.summonerId === summonerId) {
            team_color = participant.teamId === 100 ? "blue" : "red";
            enemy_color = participant.teamId === 200 ? "blue" : "red";
          }
          if (participant.spell1Id === 11 || participant.spell2Id === 11) {
            if (jungler_blue === null) {
                jungler_blue = championIDs[participant.championId];
            } else if (jungler_red === null) {
                jungler_red = championIDs[participant.championId];
            }
          }
        }
        
        for (let i = 0; i < blue_team_power.length; i++) {
          blue_team_power[i] = blue_team_power[i] / 5;
          blue_team_power[i] = Math.round(blue_team_power[i]);
        }
        for (let i = 0; i < red_team_power.length; i++) {
          red_team_power[i] = red_team_power[i] / 5;
          red_team_power[i] = Math.round(red_team_power[i]);
        }
        console.log(blue_team_power, red_team_power)

        let liveGame = await LiveGame.findOne({
          gameId: searchGame.data.gameId,
          region: region,
          team_color: team_color
        });
        if (liveGame) {
          let data = {
            red_team,
            blue_team,
            team_color,
            enemy_color,
            jungler_red,
            jungler_blue,
            blue_team_power,
            red_team_power,
            analysis: liveGame.analysis
          };
          return res.status(202).json(data);
        } else {
          const newLiveGame = new LiveGame({
            gameId: searchGame.data.gameId,
            region: region,
            red_team: red_team,
            blue_team: blue_team,
            team_color: team_color,
            enemy_color: enemy_color,
            jungler_blue: jungler_blue,
            jungler_red: jungler_red,
            blue_team_power: blue_team_power,
            red_team_power: red_team_power
          });
          await newLiveGame.save();

          let summoner = await Summoner.findOne({summonerId: summonerId}).exec();
          summoner.liveGame = newLiveGame._id;
          await summoner.save();

          
          let data = {
            red_team,
            blue_team,
            team_color,
            enemy_color,
            jungler_red,
            jungler_blue,
            blue_team_power,
            red_team_power,
            gameId: searchGame.data.gameId
          };

          res.json(data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        attempts++;
        setTimeout(searchGameInterval, 2000);
      } else {
        res.send('An error occurred: ' + error.message);
      }
    }
  }
  searchGameInterval();
})

router.post('/generate-analysis', async (req, res) => {
    try {
      const { red_team, blue_team , team_color, enemy_color, jungler_blue, jungler_red, gameId, region } = req.body;
      const prompt = `Analyze me this league of legends game: We are playing on team ${team_color}. Red Team: ${red_team.join(', ')}. Blue Team: ${blue_team.join(', ')}. Red Team Jungler: ${jungler_red}. Blue Team Jungler: ${jungler_blue}. Always write champion names exactly the way I do. For composition_type STRICTLY use ONLY ONE of the following team composition values for EACH TEAM: Charge, Capture, Split push, Poke, Protect. For power_spikes can only take the values of 0, 1, and 2 where 0 is weak 1 is moderate, and 2 is strong. Strictly respond with a JSON in this format and first team color is our team color:{\"${team_color}\":{\"positions\":{\"top\":,\"jungle\":,\"mid\":,\"bot\":,\"support\":},\"composition_type\":,\"power_spikes\":{\"early\":,\"early_mid\":,\"mid\":,\"mid_late\":,\"late\":},\"earlygame_strategy\":,\"earlygame_objectives\":,\"midgame_objectives\":,\"lategame_strategy\":,\"general_warnings\":,\"general_game_strategy\":},\"${enemy_color}\":{\"positions\":{\"top\":,\"jungle\":,\"mid\":,\"bot\":,\"support\":},\"composition_type\":,\"power_spikes\":{\"early\":,\"early_mid\":,\"mid\":,\"mid_late\":,\"late\":}}}`;
      const openAIResponse = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an AI League of Legends coach, you analyze games and find strategies to win them.",
          },
          {"role": "user", "content": `${prompt}`},
        ],
        model: "ft:gpt-3.5-turbo-1106:personal::8Ykw2B6K",
        response_format: { type: "json_object" },
        messages: [{"role": "user", "content": `${prompt}`}]
        });
        let liveGame = await LiveGame.findOne({
          gameId: gameId,
          region: region,
          team_color: team_color
        });
        const jsonContent = JSON.parse(openAIResponse.choices[0].message.content);
        liveGame.analysis = openAIResponse.choices[0].message.content;
        await liveGame.save();
        res.json(jsonContent);
    } catch (error) {
      res.send('An error occurred: ' + error.message);
    }
})

router.get('/id/:summonerId/:region', async (req, res) => {
  const { summonerId, region } = req.params;
  const maxAttempts = 5;
  let attempts = 0;
  
  const fetchGame = async () => {
    try {
      const searchGame = await axios.get(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`);
      if (searchGame && searchGame.status === 200) {
          let summoner = await Summoner.findOne({ summonerId: summonerId});
          if(summoner && summoner.liveGame) {
              let liveGame = await LiveGame.findById(summoner.liveGame)
              if (liveGame && liveGame.analysis) {
                let data = {
                  red_team: liveGame.red_team,
                  blue_team: liveGame.blue_team,
                  team_color: liveGame.team_color,
                  enemy_color: liveGame.enemy_color,
                  jungler_red: liveGame.jungler_blue,
                  jungler_blue: liveGame.jungler_red,
                  blue_team_power: liveGame.blue_team_power,
                  red_team_power: liveGame.red_team_power,
                  analysis: liveGame.analysis
                };
                return res.status(202).json(data);
              } else {
                let error = new Error('Game not found');
                error.status = 404;
                throw error;
              }
          }
      }
  } catch (error) {
      if (error.response.status === 404 && attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchGame, 2000);
      } else {
          res.send('An error occurred: ' + error.message);
      }
    }
  }
  fetchGame();
})

module.exports = router;