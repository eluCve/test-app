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
    const { summonerId, tag, region, red_team, blue_team} = req.body;
    
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();

    if (summoner.liveGame.teamsPower === null) {
        const prompt = `I play this match in League of Legends: Red team: ${red_team}. Blue Team: ${blue_team}. I want you to analyze this match and tell me how powerful each team will be on their early, early_mid, mid, mid_late, and late game by giving me a number from 0 to 2, where 0 is weak phase, 1 is moderate phase, and 2 is strong phase. I want your response to be a JSON object as it will be parsed in JavaScript with JSON.parse, never use linebreaks and have this structure: : {"red":{"early":"","early_mid":"","mid":"","mid_late":"","late":""},"blue":{"early":"","early_mid":"","mid":"","mid_late":"","late":""}}`;
        const msg = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 1024,
          messages: [{ role: "user", content: `${prompt}` },{"role": "assistant","content": "{"}],
        });
        let response = "{"+msg.content[0].text;
        let responseJSON = JSON.parse(response);
        summoner.liveGame.teamsPower = JSON.stringify(responseJSON);
        await summoner.save();
        res.send(summoner.liveGame.teamsPower);
        } else {
        res.send(summoner.liveGame.teamsPower);
        }
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

module.exports = router;