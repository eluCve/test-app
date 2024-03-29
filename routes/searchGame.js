const express = require('express');
const router = express.Router();
const axios = require('axios');
const Summoner = require('../models/summoner');
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const championIDs = require('../data/champions.json');
const championPowers = require('../data/champion_powers.json');

router.post('/', async (req, res) => {
  try {
    const { summonerId, tag, region } = req.body;
    const liveGame = await axios.get(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`);
// HAVE TO CHECK IF THERE IS NO MATCH AVAILABLE TO SEND BACK A STATUS CODE RELEVANT TO NOTIFY THE FRONT END
    if(liveGame.status === 202) return res.status(202);
    
    if(liveGame && liveGame.status === 200) {
      let summoner = await Summoner.findOne({ 
        summonerId: summonerId,
        tag: tag,
        region: region
      }).exec();

      if (summoner.liveGame.gameId ===  String(liveGame.data.gameId)) {
        res.json(summoner.liveGame)
      } else {
        const gameData = gameDataExtract(liveGame, summonerId);
        
        summoner.liveGame.gameId = liveGame.data.gameId;
        summoner.liveGame.red_team = gameData.red_team;
        summoner.liveGame.blue_team = gameData.blue_team;
        summoner.liveGame.team_color = gameData.team_color;
        summoner.liveGame.enemy_color = gameData.enemy_color;
        summoner.liveGame.jungler_red = gameData.jungler_red;
        summoner.liveGame.jungler_blue = gameData.jungler_blue;
        summoner.liveGame.red_team_power = gameData.red_team_power;
        summoner.liveGame.blue_team_power = gameData.blue_team_power;
        summoner.liveGame.playingChamp = gameData.playingChamp;
        summoner.liveGame.teamsPower = null;
        summoner.liveGame.items = null;
        summoner.liveGame.analysis = null;
        await summoner.save();

        res.json(summoner.liveGame)
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching live game data:`, error.message);
    res.status(500).send('An error occurred: ' + error.message)
  }
});

let gameDataExtract = (liveGame, summonerId) => {
  let red_team = [];
  let blue_team = [];
  let team_color = "";
  let enemy_color = "";
  let jungler_blue = null;
  let jungler_red = null;
  let blue_team_power = [0,0,0,0,0];
  let red_team_power = [0,0,0,0,0];
  let playingChamp = "";
  for (let i = 0; i < liveGame.data.participants.length; i++) {
    let participant = liveGame.data.participants[i];
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
      playingChamp = championIDs[participant.championId];
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
  let gameData = {
    red_team,
    blue_team,
    team_color,
    enemy_color,
    jungler_red,
    jungler_blue,
    blue_team_power,
    red_team_power,
    playingChamp,
  };

  return gameData;
}


module.exports = router;