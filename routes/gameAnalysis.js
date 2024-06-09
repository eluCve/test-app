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
    const { summonerId, tag, region, playingChamp, playingPosition, enemyLaner} = req.body;
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();

    if (summoner.liveGame.analysis === null) {
      const prompt = `You are an AI assistant that helps League of Legends players succeed in their ranked games by providing strategic tips and advice. For this task, you will be given information about a specific lane matchup in a game and will need to provide 3 key tips for the player to win their lane and the game.You will be given the following information:<player_champion>${playingChamp}</player_champion><enemy_champion>${enemyLaner}</enemy_champion><lane_matchup>${playingPosition}</lane_matchup>First, carefully analyze the matchup dynamics based on the player's champion, the enemy champion, and whether it is a winning, losing, or skill-based matchup. Think through the key factors that will influence how the lane should be played. Consider things like champion powerspikes, item breakpoints, gank setup/vulnerability, scaling potential, etc.Write out your analysis in a <scratchpad> section before giving your final tips. This scratchpad is just for your own reasoning and will not be shown to the player.After you have fully analyzed the matchup, provide 3 key tips that will best help the player succeed in the lane and the game. Write each tip inside <tip> tags. Tips should be about how to play well against the specific enemy champion and win the lane. Include what to expect, what to be careful of, how the lane should be played, and any other relevant strategic advice based on the matchup.Remember, your goal is to help the player win their lane and climb the ranked ladder, so make sure your tips are insightful, specific to the given matchup, and actionable. Avoid generic advice that could apply to any matchup.Do not mention anything about the task instructions themselves in your response. Speak directly to the player as if you are their personal coach. For tips avoid giving item suggestions as they may be out of the current meta or even removed from the current patch. Also keep all text as concise as possible and when referring to champion abilities don't say the whole ability name, just say the key like Q, W, E, R.Provide your analysis and tips in the following format:<scratchpad>[Your matchup analysis here]</scratchpad><tip1>[First tip here]</tip1><tip2>[Second tip here]</tip2><tip3>[Third tip here]</tip3>`;
      const msg = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: `${prompt}` }],
      });
      let response = msg.content[0].text;
      const regexTip1 = /<tip1>(.*?)<\/tip1>/;
      const regexTip2 = /<tip2>(.*?)<\/tip2>/;
      const regexTip3 = /<tip3>(.*?)<\/tip3>/;
      const tip1 = response.match(regexTip1)?.[1];
      const tip2 = response.match(regexTip2)?.[1];
      const tip3 = response.match(regexTip3)?.[1];

      if (tip1 && tip2 && tip3) {
        summoner.liveGame.analysis = response;
        await summoner.save();
        console.log(getFormattedAthensTime() + ' | ANALYSIS | ' + clientIP + ' | ' + summonerId);
        res.send(summoner.liveGame.analysis);
      } else {
        console.log("Not all tips were included in the response. Retrying...", response)
        const msg2 = await anthropic.messages.create({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1024,
          messages: [{ role: "user", content: `${prompt}` }],
        });
        let response2 = msg2.content[0].text;
        const tip1 = response2.match(regexTip1)?.[1];
        const tip2 = response2.match(regexTip2)?.[1];
        const tip3 = response2.match(regexTip3)?.[1];
        if (tip1 && tip2 && tip3) {
          summoner.liveGame.analysis = response2;
          await summoner.save();
          console.log(getFormattedAthensTime() + ' | ANALYSIS | ' + clientIP + ' | ' + summonerId);
          res.send(summoner.liveGame.analysis);
        } else {
          console.log("Not all tips were included in the response. Retrying...", response2)
          const msg3 = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1024,
            messages: [{ role: "user", content: `${prompt}` }],
          });
          summoner.liveGame.analysis = msg3.content[0].text;
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