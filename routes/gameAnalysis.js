const express = require('express');
const router = express.Router();
const Summoner = require('../models/summoner');
const OpenAI = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});


const championPositions = require('../data/champion-positions.json');

router.post('/', async (req, res) => {
  try {
    const clientIP = req.ip;
    const { summonerId, tag, region, red_team, blue_team , team_color, jungler_blue, jungler_red, playingChamp } = req.body;
    
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();

    if (summoner.liveGame.analysis === null) {
      let redPositions = assignPositions(red_team, jungler_red); 
      let bluePositions = assignPositions(blue_team, jungler_blue);  
      const prompt = `Give 5 tips AND 5 warnings that will help me play better for this league of legends game. Focus 70% of your tips and warnings on laning phase, meaning how to win the lane, and the 30% on the overall gameplay. In this game I play ${playingChamp} on team ${team_color}. Red Team: ${redPositions}. Blue Team: ${bluePositions}. Your response should ALWAYS be in this EXACT JSON format making sure you fill tip 1-5 and warning 1-5: {\"tip1\":\" \",\"tip2\":\" \",\"tip3\":\" \",\"tip4\":\" \",\"tip5\":\" \",\"warning1\":\" \",\"warning2\":\" \",\"warning3\":\" \",\"warning4\":\" \",\"warning5\":\" \"}`;
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
      const jsonResponse = JSON.parse(openAIResponse.choices[0].message.content);
      if (jsonResponse.warning1 && jsonResponse.warning2 && jsonResponse.warning3 && jsonResponse.warning4 && jsonResponse.warning5) {
        summoner.liveGame.analysis = openAIResponse.choices[0].message.content;
        await summoner.save();
        console.log(getFormattedAthensTime() + ' | ANALYSIS | ' + clientIP + ' | ' + summonerId);
        res.send(summoner.liveGame.analysis);
      } else {
        console.log("Not all warnings were included in the response. Retrying...", openAIResponse.choices[0].message.content)
        const openAIResponse2 = await openai.chat.completions.create({
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
        const jsonResponse2 = JSON.parse(openAIResponse2.choices[0].message.content);
        if (jsonResponse2.warning1 && jsonResponse2.warning2 && jsonResponse2.warning3 && jsonResponse2.warning4 && jsonResponse2.warning5) {
          summoner.liveGame.analysis = openAIResponse2.choices[0].message.content;
          await summoner.save();
          console.log(getFormattedAthensTime() + ' | ANALYSIS | ' + clientIP + ' | ' + summonerId);
          res.send(summoner.liveGame.analysis);
        } else {
          console.log("Not all warnings were included in the response. Retrying...", openAIResponse2.choices[0].message.content)
          const openAIResponse3 = await openai.chat.completions.create({
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
          summoner.liveGame.analysis = openAIResponse3.choices[0].message.content;
          await summoner.save();
          console.log(getFormattedAthensTime() + ' | ANALYSIS | ' + clientIP + ' | ' + summonerId);
          res.send(summoner.liveGame.analysis);
        }
        
      }
    } else {
      res.send(summoner.liveGame.analysis);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error generating analysis:`, error.message);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

function assignPositions(team, jungler) {
  let positionUsage = {};
  let assignments = {};
  let prompt = "";

  // Assign the Jungler position to the specified champion
  assignments[jungler] = "Jungler";
  positionUsage["Jungler"] = true;

  // Create a list of all positions with their preferences sorted by percentage,
  // excluding the Jungler champion entirely from further processing.
  let allPositions = team.filter(champion => champion !== jungler) // Exclude the Jungler champion
    .flatMap(champion => 
      Object.entries(championPositions[champion].positions).map(([position, percentage]) => ({
          champion,
          position,
          percentage: parseFloat(percentage)
      }))
    ).sort((a, b) => b.percentage - a.percentage); // Sort by highest percentage first

  // Assign positions to team based on the sorted preferences.
  allPositions.forEach(({champion, position}) => {
      if (!assignments[champion] && !positionUsage[position]) {
          assignments[champion] = position;
          positionUsage[position] = true;
      }
  });

  // Generate the prompt string
  for(let champion in assignments) {
    prompt += `${assignments[champion]}:${champion} `
  }
  
  return prompt.trim(); // Added trim to clean up any trailing space
}

function getFormattedAthensTime() {
  const now = new Date();
  const options = {
      weekday: 'long', // "Monday", "Tuesday", etc.
      year: 'numeric', // "2021"
      month: 'long', // "July"
      day: 'numeric', // "31"zz
      hour: '2-digit', // "12" AM/PM
      minute: '2-digit', // "59"
      second: '2-digit', // "59"
      timeZoneName: 'short' // "GMT+3"
  };
  const athensTime = now.toLocaleString('en-US', { timeZone: 'Europe/Athens', ...options });
  return athensTime;
}

module.exports = router;