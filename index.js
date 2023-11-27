const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const ejs_layouts = require('express-ejs-layouts');
const app = express();
// middleware
app.use(express.json());
app.use(express.static('public'));
// view engine
app.set('view engine', 'ejs');
app.use(ejs_layouts);



const openai = new OpenAI({
  apiKey: OpenAI_API_KEY,
});

const championIDs = {
  "1": "Annie",
  "2": "Olaf",
  "3": "Galio",
  "4": "TwistedFate",
  "5": "XinZhao",
  "6": "Urgot",
  "7": "Leblanc",
  "8": "Vladimir",
  "9": "Fiddlesticks",
  "10": "Kayle",
  "11": "MasterYi",
  "12": "Alistar",
  "13": "Ryze",
  "14": "Sion",
  "15": "Sivir",
  "16": "Soraka",
  "17": "Teemo",
  "18": "Tristana",
  "19": "Warwick",
  "20": "Nunu",
  "21": "MissFortune",
  "22": "Ashe",
  "23": "Tryndamere",
  "24": "Jax",
  "25": "Morgana",
  "26": "Zilean",
  "27": "Singed",
  "28": "Evelynn",
  "29": "Twitch",
  "30": "Karthus",
  "31": "Chogath",
  "32": "Amumu",
  "33": "Rammus",
  "34": "Anivia",
  "35": "Shaco",
  "36": "DrMundo",
  "37": "Sona",
  "38": "Kassadin",
  "39": "Irelia",
  "40": "Janna",
  "41": "Gangplank",
  "42": "Corki",
  "43": "Karma",
  "44": "Taric",
  "45": "Veigar",
  "48": "Trundle",
  "50": "Swain",
  "51": "Caitlyn",
  "53": "Blitzcrank",
  "54": "Malphite",
  "55": "Katarina",
  "56": "Nocturne",
  "57": "Maokai",
  "58": "Renekton",
  "59": "JarvanIV",
  "60": "Elise",
  "61": "Orianna",
  "62": "MonkeyKing",
  "63": "Brand",
  "64": "LeeSin",
  "67": "Vayne",
  "68": "Rumble",
  "69": "Cassiopeia",
  "72": "Skarner",
  "74": "Heimerdinger",
  "75": "Nasus",
  "76": "Nidalee",
  "77": "Udyr",
  "78": "Poppy",
  "79": "Gragas",
  "80": "Pantheon",
  "81": "Ezreal",
  "82": "Mordekaiser",
  "83": "Yorick",
  "84": "Akali",
  "85": "Kennen",
  "86": "Garen",
  "89": "Leona",
  "90": "Malzahar",
  "91": "Talon",
  "92": "Riven",
  "96": "KogMaw",
  "98": "Shen",
  "99": "Lux",
  "101": "Xerath",
  "102": "Shyvana",
  "103": "Ahri",
  "104": "Graves",
  "105": "Fizz",
  "106": "Volibear",
  "107": "Rengar",
  "110": "Varus",
  "111": "Nautilus",
  "112": "Viktor",
  "113": "Sejuani",
  "114": "Fiora",
  "115": "Ziggs",
  "117": "Lulu",
  "119": "Draven",
  "120": "Hecarim",
  "121": "Khazix",
  "122": "Darius",
  "126": "Jayce",
  "127": "Lissandra",
  "131": "Diana",
  "133": "Quinn",
  "134": "Syndra",
  "136": "AurelionSol",
  "141": "Kayn",
  "142": "Zoe",
  "143": "Zyra",
  "145": "Kaisa",
  "147": "Seraphine",
  "150": "Gnar",
  "154": "Zac",
  "157": "Yasuo",
  "161": "Velkoz",
  "163": "Taliyah",
  "164": "Camille",
  "166": "Akshan",
  "200": "Belveth",
  "201": "Braum",
  "202": "Jhin",
  "203": "Kindred",
  "221": "Zeri",
  "222": "Jinx",
  "223": "TahmKench",
  "233": "Briar",
  "234": "Viego",
  "235": "Senna",
  "236": "Lucian",
  "238": "Zed",
  "240": "Kled",
  "245": "Ekko",
  "246": "Qiyana",
  "254": "Vi",
  "266": "Aatrox",
  "267": "Nami",
  "268": "Azir",
  "350": "Yuumi",
  "360": "Samira",
  "412": "Thresh",
  "420": "Illaoi",
  "421": "RekSai",
  "427": "Ivern",
  "429": "Kalista",
  "432": "Bard",
  "497": "Rakan",
  "498": "Xayah",
  "516": "Ornn",
  "517": "Sylas",
  "518": "Neeko",
  "523": "Aphelios",
  "526": "Rell",
  "555": "Pyke",
  "711": "Vex",
  "777": "Yone",
  "875": "Sett",
  "876": "Lillia",
  "887": "Gwen",
  "888": "Renata",
  "895": "Nilah",
  "897": "KSante",
  "902": "Milio",
  "950": "Naafiri"
}

app.get('/', (req, res) => {
  return res.render('index', { page: 'index'})
})

app.get('/live/:region/:summoner', async (req, res) => {
  try {
    const { region, summoner } = req.params;
    const searchSummoner = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner.replace(/\s/g, "%20")}?api_key=${Riot_API_KEY}`);
    if (searchSummoner) {
      res.render('livegame', {
        page: 'livegame',
        region: region,
        summonerName: summoner,
        summonerId: searchSummoner.data.id
      })
    }
  } catch (error) {
    res.render('noUser', { page: 'noUser'})
  }
})

app.get('/search-game/:region/:summonerId', async (req, res) => {
  try {
    const { region, summonerId } = req.params;
    const searchGame = await axios.get(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${Riot_API_KEY}`);
    if (searchGame) {
      let red_team = [];
      let blue_team = [];
      let teamColor = "";
      let enemyTeamColor = "";
      let junglerBlue = null;
      let junglerRed = null;

      for (let i = 0; i < searchGame.data.participants.length; i++) {
        let participant = searchGame.data.participants[i];
        let championId = championIDs[participant.championId];
        if (i < 5) {
            blue_team.push(championId);
        } else {
            red_team.push(championId);
        }
        if (participant.summonerId === summonerId) {
          teamColor = participant.teamId === 100 ? "blue" : "red";
          enemyTeamColor = participant.teamId === 200 ? "blue" : "red";
        }
        if (participant.spell1Id === 11 || participant.spell2Id === 11) {
          if (junglerBlue === null) {
              junglerBlue = championIDs[participant.championId];
          } else if (junglerRed === null) {
              junglerRed = championIDs[participant.championId];
          }
        }
      }
      let data = {
        red_team,
        blue_team,
        teamColor,
        enemyTeamColor,
        junglerBlue,
        junglerRed
      };
      console.log(data)
      res.json(data);
    }
  } catch (error) {
    res.send(error);
  }
})

app.post('/api', async (req, res) => {
  try {
    const { red_team, blue_team , teamColor, enemyTeamColor, junglerBlue, junglerRed } = req.body;

    const prompt = `
            You are a professional league of legends coach and mentor. You have experience in analysing games, and creating strategies for teams to win. In your output you ALWAYS explain why so other people can understand how and why to play with your suggestions. Also write information in concise bits of information because all players doesnt have much time to read, probably around 30 seconds.

            Teams:
            Red: 
            ${red_team.map(champion => champion.toString()).join(', ')},
            Blue: 
            ${blue_team.map(champion => champion.toString()).join(', ')}
            When you use a champion name in your output always type them exactly as you see them here.

            Red team jungle is: ${junglerRed}.
            Blue team jungle is: ${junglerBlue}.
            And we are playing on team: ${teamColor}.

            STRICTLY USE ONLY ONE of the following team composition values: Charge | Capture | Split push | Poke | Protect | Dance.
            Charge Comp: Aggressive, fight-initiating champions.
            Capture Comp: Isolating and eliminating single targets.
            Split Push Comp: Independent lane pushing strategy.
            Poke Comp: Long-range, gradual damage infliction.
            Protect Comp: Defending and empowering key carry.
            Dance Comp: Sustains long fights, flexible engagement.


            The output should be ONLY a JSON OBJECT with the following information and structure:

            {"${teamColor}":{"lanes":{"top":"champion-name","jungle":"champion-name","mid":"champion-name","adc":"champion-name","support":"champion-name"},"composition":"composition","strategy":{"general":"Place here paragraph that will include the following: 1) What are the main benefits of this team comp? 2) What is the enemy ${enemyTeamColor} team comp and how can this team counter them? 3) How to expect the game to unravel and what conditions does this team ${teamColor} need to reach enemy nexus and win? 4) How the champions in this team complement each other?","teamfights":{"winningScenario":"Place here a detailed team fight simulation of what each champion does where this team (${teamColor}) wins.","losingScenario":"Place here a detailed team fight simulation of what each champion does where the enemy team ${enemyTeamColor} wins."},"objectives":"Place here which objectives should this team ${teamColor} contest in each game phase, early, mid, late, and explain why.","warnings":"Place here what to expect from the enemy team ${enemyTeamColor} and how to avoid their strategy. Also explain why."}},"${enemyTeamColor}":{"lanes":{"top":"champion-name","jungle":"champion-name","mid":"champion-name","adc":"champion-name","support":"champion-name"},"composition":"composition"}}`;
    const openAIResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a league of legends AI coach designed to output JSON.",
        },
        {"role": "user", "content": `${prompt}`},
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [{"role": "user", "content": `${prompt}`}],
      temperature: 1,
      max_tokens: 1024,
    });
    const jsonContent = JSON.parse(openAIResponse.choices[0].message.content);
    res.json(jsonContent);
  } catch (error) {
    res.send('An error occurred: ' + error.message);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
