const express = require('express');
const router = express.Router();
const axios = require('axios');
const Summoner = require('../models/summoner');
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const championIDs = require('../data/champions.json');

router.post('/', async (req, res) => {
  try {
    let { summonerId, tag, region } = req.body;
    const liveGame = await axios.get(`https://${region}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`);

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
        console.log(`https://poromentor.gg/summoner/${summoner.region}/${summoner.summonerName}/${summoner.tag}`)
        const gameData = gameDataExtract(liveGame, summonerId);
        summoner.gameCount = summoner.gameCount + 1;
        summoner.liveGame.gameId = liveGame.data.gameId;
        summoner.liveGame.red_team = gameData.red_team;
        summoner.liveGame.blue_team = gameData.blue_team;
        summoner.liveGame.team_color = gameData.team_color;
        summoner.liveGame.enemy_color = gameData.enemy_color;
        summoner.liveGame.jungler_red = gameData.jungler_red;
        summoner.liveGame.jungler_blue = gameData.jungler_blue;
        summoner.liveGame.playingChamp = gameData.playingChamp;
        summoner.liveGame.items = null;
        summoner.liveGame.analysis = null;
        await summoner.save();

        res.json(summoner.liveGame)
      }
    }
  } catch (error) {
    if(error.response.status && error.response.status != 404) console.error(`${getFormattedAthensTime()} | Error fetching live game data:`, error.message);
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
  let playingChamp = "";
  for (let i = 0; i < liveGame.data.participants.length; i++) {
    let participant = liveGame.data.participants[i];
    let championId = championIDs[participant.championId];
    if (i < 5) {
        blue_team.push(championId);
    } else {
        red_team.push(championId);
    }
    if (participant.puuid === summonerId) {
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
  let gameData = {
    red_team,
    blue_team,
    team_color,
    enemy_color,
    jungler_red,
    jungler_blue,
    playingChamp,
  };

  return gameData;
}

function getFormattedAthensTime() {
  const now = new Date();
  const options = {
      weekday: 'long', // "Monday", "Tuesday", etc.
      year: 'numeric', // "2021"
      month: 'long', // "July"
      day: 'numeric', // "31"
      hour: '2-digit', // "12" AM/PM
      minute: '2-digit', // "59"
      second: '2-digit', // "59"
      timeZoneName: 'short' // "GMT+3"
  };
  const athensTime = now.toLocaleString('en-US', { timeZone: 'Europe/Athens', ...options });
  return athensTime;
}

module.exports = router;
