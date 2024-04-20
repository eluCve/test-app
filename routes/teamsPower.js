const express = require('express');
const router = express.Router();
const Summoner = require('../models/summoner');
const Anthropic = require('@anthropic-ai/sdk');

const ANT_API_KEY = process.env.ANT_API_KEY;

const anthropic = new Anthropic({
  apiKey: ANT_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const clientIP = req.ip;
    const { summonerId, tag, region, red_team, blue_team} = req.body;
    
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();

    if (summoner.liveGame.teamsPower === null) {
        const prompt = `I play this match in League of Legends: Red team: ${red_team}. Blue Team: ${blue_team}. I want you to analyze this match and tell me how powerful each team will be on their early game, early to mid game, mid game, mid to late game, and late game by giving me a number from 0 to 2, where 0 is weak, 1 is moderate, and 2 is strong. Use each strength number at least once. I want your response to be a JSON object as it will be parsed in JavaScript with JSON.parse, never use linebreaks and have this structure: : {"red":{"early":"","early_mid":"","mid":"","mid_late":"","late":""},"blue":{"early":"","early_mid":"","mid":"","mid_late":"","late":""}}`;
        const msg = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 1024,
          messages: [{ role: "user", content: `${prompt}` },{"role": "assistant","content": "{"}],
        });
        let response = "{"+msg.content[0].text;
        summoner.liveGame.teamsPower = response;
        await summoner.save();
        console.log(getFormattedAthensTime() + ' | POWERS | ' + clientIP + ' | ' + summonerId);
        res.send(response);
        } else {
        res.send(summoner.liveGame.teamsPower);
        }
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

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