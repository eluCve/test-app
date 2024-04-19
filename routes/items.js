const express = require('express');
const router = express.Router();
const Summoner = require('../models/summoner');
const Anthropic = require('@anthropic-ai/sdk');

const ANT_API_KEY = process.env.ANT_API_KEY;

const anthropic = new Anthropic({
  apiKey: ANT_API_KEY,
});

const championItemsMeta = require('../data/champion-items-meta.json');
const allItems = require('../data/items.json');

router.post('/', async (req, res) => {
  try {
    const clientIP = req.ip;
    const { summonerId, tag, region, red_team, blue_team , team_color, jungler_blue, jungler_red, playingChamp } = req.body;
    
    let summoner = await Summoner.findOne({ 
      summonerId: summonerId,
      tag: tag,
      region: region
    }).exec();
    if (summoner.liveGame.items === null) {
        let championItems = championItemsMeta[playingChamp].items;
        let itemsString = "";
        for (const [item, percentage] of Object.entries(championItems)) {
          let percentageNumber = parseFloat(percentage, 10)
          if (percentageNumber > 1) {
            let findItem = null;
            for (const id in allItems) {
              if (allItems[id].name === item) {
                findItem = { id: id, data: allItems[id]};;
              }
            }
            let itemDescription = findItem.data.description.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ');
            itemsString += `${item}(item_id: ${findItem.id}, STATS:${itemDescription} PROBABILITY: ${percentage}), `;
          }
        }
        const prompt = `I play ${playingChamp} on team ${team_color}. Red Team: ${red_team}. Blue Team: ${blue_team}. Red Team Jungler: ${jungler_red}. Blue Team Jungler: ${jungler_blue}. Help me make an item build for this game, to counter the enemy team, out of these and ONLY these items: ${itemsString}, Berserker's Greaves(item_id: 3006), Boots of Swiftness(item_id: 3009), Ionian Boots of Lucidity(item_id: 3158), Mercury's Treads(item_id: 3111), Mobility Boots(item_id: 3117), Plated Steelcaps(item_id: 3047), Sorcerer's Shoes(item_id: 3020).  Probability means how often players include the item into their build. The highest probability items are the most common, it's the current meta for ${playingChamp}, and usualy chosen as first items, core build. I want your response to be a JSON object as it will be parsed in JavaScript with JSON.parse, never use linebreaks and have this structure: {"item1":{"id": "", "reason": ""},"item2":{"id": "", "reason": ""},"item3":{"id": "", "reason": ""},"item4":{"id": "", "reason": ""},"item5":{"id": "", "reason": ""},"item6":{"id": "", "reason": ""}}. For reason you should say why you chose that item against these enemies and item1 must be boots. If you see Monkey King somewhere in the data please call him Wukong instead.`;
        const msg = await anthropic.messages.create({
          model: "claude-3-haiku-20240307",
          max_tokens: 1024,
          messages: [{ role: "user", content: `${prompt}` },{"role": "assistant","content": "{"}],
        });
        let response = "{"+msg.content[0].text;
        let responseJSON = JSON.parse(response);
        let data = {
          "item1": {
            "id": responseJSON.item1.id,
            "reason": responseJSON.item1.reason,
            "name": allItems[responseJSON.item1.id].name,
            "description": allItems[responseJSON.item1.id].description
          },
          "item2": {
            "id": responseJSON.item2.id,
            "reason": responseJSON.item2.reason,
            "name": allItems[responseJSON.item2.id].name,
            "description": allItems[responseJSON.item2.id].description
          },
          "item3": {
            "id": responseJSON.item3.id,
            "reason": responseJSON.item3.reason,
            "name": allItems[responseJSON.item3.id].name,
            "description": allItems[responseJSON.item3.id].description
          },
          "item4": {
            "id": responseJSON.item4.id,
            "reason": responseJSON.item4.reason,
            "name": allItems[responseJSON.item4.id].name,
            "description": allItems[responseJSON.item4.id].description
          },
          "item5": {
            "id": responseJSON.item5.id,
            "reason": responseJSON.item5.reason,
            "name": allItems[responseJSON.item5.id].name,
            "description": allItems[responseJSON.item5.id].description
          },
          "item6": {
            "id": responseJSON.item6.id,
            "reason": responseJSON.item6.reason,
            "name": allItems[responseJSON.item5.id].name,
            "description": allItems[responseJSON.item6.id].description
          },
        }
        summoner.liveGame.items = JSON.stringify(data);
        await summoner.save();
        console.log(getFormattedAthensTime() + ' | ITEMS | ' + clientIP + ' | ' + summonerId);
        res.send(summoner.liveGame.items);
        } else {
        res.send(summoner.liveGame.items);
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