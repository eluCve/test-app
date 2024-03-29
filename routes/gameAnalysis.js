const express = require('express');
const router = express.Router();
const Summoner = require('../models/summoner');
const OpenAI = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { summonerId, tag, region, red_team, blue_team , team_color, jungler_blue, jungler_red, playingChamp } = req.body;
    
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();
    if (summoner.liveGame.analysis === null) {
      const prompt = `Give 5 tips AND 5 warnings that will help me play better for this league of legends game. Focus 70% of your tips and warnings on laning phase, meaning how to win the lane, and the 30% on the overall gameplay. In this game I play ${playingChamp} on team ${team_color}. Red Team: ${red_team}. Blue Team: ${blue_team}. Red Team Jungler: ${jungler_red}. Blue Team Jungler: ${jungler_blue}.  Your response should ALWAYS be in this EXACT JSON format making sure you fill tip 1-5 and warning 1-5: {\"tip1\":\" \",\"tip2\":\" \",\"tip3\":\" \",\"tip4\":\" \",\"tip5\":\" \",\"warning1\":\" \",\"warning2\":\" \",\"warning3\":\" \",\"warning4\":\" \",\"warning5\":\" \"}`;
      const openAIResponse = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a league of legends coach that helps people analyze their games before a match starts. You give 5 tips and 5 warnings that will help players play better on the specific champion. Your response should ALWAYS be in this EXACT JSON format making sure you fill tip 1-5 and warning 1-5: {\"tip1\":\" \",\"tip2\":\" \",\"tip3\":\" \",\"tip4\":\" \",\"tip5\":\" \",\"warning1\":\" \",\"warning2\":\" \",\"warning3\":\" \",\"warning4\":\" \",\"warning5\":\" \"}",
          },
          {"role": "user", "content": `${prompt}`},
        ],
        model: "ft:gpt-3.5-turbo-0125:personal:generateanalysis:95d3RaQO",
        response_format: { type: "json_object" },
      });
      summoner.liveGame.analysis = openAIResponse.choices[0].message.content;
      await summoner.save();
      res.send(summoner.liveGame.analysis);
    } else {
      res.send(summoner.liveGame.analysis);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error generating analysis:`, error.message);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

module.exports = router;