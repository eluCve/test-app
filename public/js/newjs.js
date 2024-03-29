const summonerInfo = document.getElementById("summonerInfo");
const region = summonerInfo.getAttribute("data-region");
const summonerId = summonerInfo.getAttribute("data-summoner-id");
const summonerName = summonerInfo.getAttribute("data-summoner-name");
const tag = summonerInfo.getAttribute("data-tag");
const summonerLevel = summonerInfo.getAttribute("data-summoner-level");
const profileIconId = summonerInfo.getAttribute("data-profile-icon-id");

async function searchLiveGame() {
  document.getElementById("search-game-btn").style.display = "none";
  document.getElementById("status").innerText = "Searching...";
  document.getElementById("loading-animation").style.display = "flex";

  let count = 0;
  let gameFound = false;

  while(!gameFound || count <= 8) {
    gameFound = await gameStatus();
    if(!gameFound) {
        await delay(1500);
        count++
    }
  }

  if (gameFound) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("main").style.display = "block";
    getPowerSpikes();
    getItemSet();
    getAnalysis();    
  } else {
    document.getElementById("status").innerText =
        `${summonerName} is not currently in game. Try again when the Loading Screen appears.`;
    document.getElementById("search-game-btn").style.display = "flex";
    document.getElementById("loading-animation").style.display = "none";
  }
};

async function gameStatus() {
    try {
        const response = await fetch(`/api/search-game`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region: region, summonerId: summonerId }),
          });
         
          if (!response.ok) {
            if (response.status === 208) {
                return false;
            } else {
                return response.json()
            }
        }
    } catch (error) {
        console.error("Fetch error: ", error);
        document.getElementById("status").innerText = "An error has occurred, please try again in a few minutes.";
        document.getElementById("search-game-btn").style.display = "flex";
        document.getElementById("loading-animation").style.display = "none";
    }
};

async function getPowerSpikes( ) {  // ADD HERE ALL THE VARIABLES NEEDED
    try {
        const response = await fetch("/api/get-powerspikes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              red_team: red_team,
              blue_team: blue_team,
              team_color: team_color,
              enemy_color: enemy_color,
              jungler_blue: jungler_blue,
              jungler_red: jungler_red,
              gameId: gameId,
              region: region,
            }),
          });
          if (response.ok) {
            if (response.status === 200) {
              const analysis = await response.json();
              // ADD HERE THE CODE TO SHOW TO THE RESPONSE INSIDE THE BOXES
            } else {
              // Handle other non-ok responses
              throw new Error(`HTTP error: ${response.status}`);
            }
          }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

async function getItemSet( ) {  // ADD HERE ALL THE VARIABLES NEEDED
    try {
        const response = await fetch("/api/get-items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              red_team: red_team,
              blue_team: blue_team,
              team_color: team_color,
              enemy_color: enemy_color,
              jungler_blue: jungler_blue,
              jungler_red: jungler_red,
              gameId: gameId,
              region: region,
            }),
          });
          if (response.ok) {
            if (response.status === 200) {
              const analysis = await response.json();
            //   ADD HERE THE CODE TO SHOW TO THE RESPONSE INSIDE THE BOXES
            } else {
              // Handle other non-ok responses
              throw new Error(`HTTP error: ${response.status}`);
            }
          }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

async function getAnalysis( ) {  // ADD HERE ALL THE VARIABLES NEEDED
    try {
        const response = await fetch("/api/get-analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              red_team: red_team,
              blue_team: blue_team,
              team_color: team_color,
              enemy_color: enemy_color,
              jungler_blue: jungler_blue,
              jungler_red: jungler_red,
              gameId: gameId,
              region: region,
            }),
          });
          if (response.ok) {
            if (response.status === 200) {
              const analysis = await response.json();
            //   ADD HERE THE CODE TO SHOW TO THE RESPONSE INSIDE THE BOXES
            } else {
              // Handle other non-ok responses
              throw new Error(`HTTP error: ${response.status}`);
            }
          }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
}

async function generateAnalysis(
  red_team,
  blue_team,
  team_color,
  enemy_color,
  jungler_blue,
  jungler_red,
  gameId,
  region
) {
  try {
    const response = await fetch("/api/generate-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        red_team: red_team,
        blue_team: blue_team,
        team_color: team_color,
        enemy_color: enemy_color,
        jungler_blue: jungler_blue,
        jungler_red: jungler_red,
        gameId: gameId,
        region: region,
      }),
    });
    if (response.ok) {
      if (response.status === 200) {
        const analysis = await response.json();
        showAnalysis(analysis, team_color);
      } else {
        // Handle other non-ok responses
        throw new Error(`HTTP error: ${response.status}`);
      }
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

function showTeams(teams) {
  ["red", "blue"].forEach((team) => {
    const teamData = teams[`${team}_team`];
    const container = document.querySelector(`#team-${team}-icons`);
    container.innerHTML = "";
    teamData.forEach((champion) => {
      const img = document.createElement("img");
      img.className = "champion-icon";
      img.src = `/assets/champion-icons/${champion}.png`;
      const div = document.createElement("div");
      div.className = "champion-container";
      div.appendChild(img);
      container.appendChild(div);
    });
  });
  blueChart.data.datasets[0].data = teams.blue_team_power;
  redChart.data.datasets[0].data = teams.red_team_power;
  blueChart.update();
  redChart.update();
};

function showAnalysis(analysis, team_color) {
  const redTeamContainer = document.getElementById("team-red-icons");
  const blueTeamContainer = document.getElementById("team-blue-icons");
  redTeamContainer.innerHTML = "";
  blueTeamContainer.innerHTML = "";
  Object.entries(analysis.red.positions).forEach(([lane, champion]) => {
    let img = document.createElement("img");
    let div = document.createElement("div");
    img.className = "champion-icon";
    img.src = `/assets/champion-icons/${champion}.png`;
    div.className = "champion-container";
    div.appendChild(img);
    redTeamContainer.appendChild(div);
  });
  Object.entries(analysis.blue.positions).forEach(([lane, champion]) => {
    let img = document.createElement("img");
    let div = document.createElement("div");
    img.className = "champion-icon";
    img.src = `/assets/champion-icons/${champion}.png`;
    div.className = "champion-container";
    div.appendChild(img);
    blueTeamContainer.appendChild(div);
  });
  const powerSpikeColors = {
    0: "#c8453c",
    1: "#c89c3c",
    2: "#3cc848",
    default: "#000"
  };
 
  function setPowerSpikeColor(element, value) {
    element.style.backgroundColor = powerSpikeColors[value] || powerSpikeColors.default;
  }
 
  const redElements = ["red-early", "red-early-mid", "red-mid", "red-mid-late", "red-late"];
  const blueElements = ["blue-early", "blue-early-mid", "blue-mid", "blue-mid-late", "blue-late"];
 
  redElements.forEach(id => {
    const element = document.getElementById(id);
    const value = analysis.red.power_spikes[id.split('-')[1]];
    setPowerSpikeColor(element, value);
  });
 
  blueElements.forEach(id => {
    const element = document.getElementById(id);
    const value = analysis.blue.power_spikes[id.split('-')[1]];
    setPowerSpikeColor(element, value);
  });

  document.getElementById("red-comp").innerHTML = analysis.red.composition_type;
  document.getElementById("blue-comp").innerHTML = analysis.blue.composition_type;
  document.getElementById("general-strategy").innerHTML = analysis[team_color].general_game_strategy;
  document.getElementById("warnings").innerHTML = analysis[team_color].general_warnings;
  document.getElementById("earlygame-strategy").innerHTML = analysis[team_color].earlygame_strategy;
  document.getElementById("earlygame-objectives").innerHTML = analysis[team_color].earlygame_objectives;
  document.getElementById("midgame-objectives").innerHTML = analysis[team_color].midgame_objectives;
  document.getElementById("lategame-strategy").innerHTML = analysis[team_color].lategame_strategy;
};

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

searchLiveGame();
