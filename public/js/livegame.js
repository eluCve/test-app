const summonerInfo = document.getElementById("summonerInfo");
const region = summonerInfo.getAttribute("data-region");
const summonerId = summonerInfo.getAttribute("data-summoner-id");
const summonerName = summonerInfo.getAttribute("data-summoner-name");
const tag = summonerInfo.getAttribute("data-tag");

let loadTimes = 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function searchLiveGame() {
  document.querySelector('#search-game-btn').removeEventListener('click', initiateSearch);
  document.querySelector('#search-game-btn input').disabled = true;
  document.querySelector('#search-game-btn input').checked = true;
  document.getElementById("status").innerText = "Searching...";
  try {
    const response = await fetch(`/search-game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summonerId: summonerId, tag: tag, region: region }),
    });
    if (response.ok) {
      const gameData = await response.json();
      document.getElementById("loading").style.display = "none";
      document.getElementById("main").style.display = "block"; 
      document.getElementById('background-src').src = `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${gameData.playingChamp}_0.jpg`;
      
      let playingPosition;
      let enemyLaner;
      fetch('/data/champion-positions.json').then(response => response.json()).then(data => {
        redPositions = assignPositions(gameData.red_team, gameData.jungler_red, data);
        bluePositions = assignPositions(gameData.blue_team, gameData.jungler_blue, data);
        console.log(redPositions, bluePositions);
        if (gameData.team_color === "red") {
          Object.keys(redPositions).forEach((champion) => {
            if (champion === gameData.playingChamp) {
              playingPosition = redPositions[gameData.playingChamp];
              enemyLaner = Object.keys(bluePositions).find(champion => bluePositions[champion] === playingPosition);
              console.log(playingPosition, enemyLaner);
            }
          });
        } else {
          Object.keys(bluePositions).forEach((champion) => {
            if (champion === gameData.playingChamp) {
              playingPosition = bluePositions[gameData.playingChamp];
              enemyLaner = Object.keys(redPositions).find(champion => redPositions[champion] === playingPosition);
              console.log(playingPosition, enemyLaner);
            }
          });
        }
        generateAnalysis(gameData.playingChamp, enemyLaner, playingPosition);
      });
      
      fetch('/data/champion-winrates.json').then(response => response.json()).then(data => {
        let playingChamp;
        for (let champion in data) {
          data[champion] = data[champion].map(str => parseFloat(str));
        }
        if(gameData.playingChamp === 'MonkeyKing') {
          playingChamp = 'Wukong';
        } else {
          playingChamp = gameData.playingChamp;
        }
        if(enemyLaner === 'MonkeyKing') {
          enemyLaner = 'Wukong';
        } else {
          enemyLaner = enemyLaner;
        }
        document.getElementById('your-champion').textContent = playingChamp;
        document.getElementById('enemy-champion').textContent = enemyLaner;
        updateGradient(data[playingChamp], 'gradient1');
        updateGradient(data[enemyLaner], 'gradient2');
        let yourTeamWinRates = [0, 0, 0, 0, 0, 0, 0];
        let enemyTeamWinRates = [0, 0, 0, 0, 0, 0, 0];
        if(gameData.team_color === 'blue') {
          gameData.blue_team.forEach(champion => {
            yourTeamWinRates[0] += data[champion][0];
            yourTeamWinRates[1] += data[champion][1];
            yourTeamWinRates[2] += data[champion][2];
            yourTeamWinRates[3] += data[champion][3];
            yourTeamWinRates[4] += data[champion][4];
            yourTeamWinRates[5] += data[champion][5];
            yourTeamWinRates[6] += data[champion][6];
        }
        );
        gameData.red_team.forEach(champion => {
          enemyTeamWinRates[0] += data[champion][0];
          enemyTeamWinRates[1] += data[champion][1];
          enemyTeamWinRates[2] += data[champion][2];
          enemyTeamWinRates[3] += data[champion][3];
          enemyTeamWinRates[4] += data[champion][4];
          enemyTeamWinRates[5] += data[champion][5];
          enemyTeamWinRates[6] += data[champion][6];
        }
        );
        } else {
          gameData.red_team.forEach(champion => {
            yourTeamWinRates[0] += data[champion][0];
            yourTeamWinRates[1] += data[champion][1];
            yourTeamWinRates[2] += data[champion][2];
            yourTeamWinRates[3] += data[champion][3];
            yourTeamWinRates[4] += data[champion][4];
            yourTeamWinRates[5] += data[champion][5];
            yourTeamWinRates[6] += data[champion][6];
        }
        );
        gameData.blue_team.forEach(champion => {
          enemyTeamWinRates[0] += data[champion][0];
          enemyTeamWinRates[1] += data[champion][1];
          enemyTeamWinRates[2] += data[champion][2];
          enemyTeamWinRates[3] += data[champion][3];
          enemyTeamWinRates[4] += data[champion][4];
          enemyTeamWinRates[5] += data[champion][5];
          enemyTeamWinRates[6] += data[champion][6];
        }
        );
        }
        yourTeamWinRates[0] /= 5;
        yourTeamWinRates[1] /= 5;
        yourTeamWinRates[2] /= 5;
        yourTeamWinRates[3] /= 5;
        yourTeamWinRates[4] /= 5;
        yourTeamWinRates[5] /= 5;
        yourTeamWinRates[6] /= 5;
        enemyTeamWinRates[0] /= 5;
        enemyTeamWinRates[1] /= 5;
        enemyTeamWinRates[2] /= 5;
        enemyTeamWinRates[3] /= 5;
        enemyTeamWinRates[4] /= 5;
        enemyTeamWinRates[5] /= 5;
        enemyTeamWinRates[6] /= 5;
        yourTeamWinRates[0] = Math.round(yourTeamWinRates[0]);
        yourTeamWinRates[1] = Math.round(yourTeamWinRates[1]);
        yourTeamWinRates[2] = Math.round(yourTeamWinRates[2]);
        yourTeamWinRates[3] = Math.round(yourTeamWinRates[3]);
        yourTeamWinRates[4] = Math.round(yourTeamWinRates[4]);
        yourTeamWinRates[5] = Math.round(yourTeamWinRates[5]);
        yourTeamWinRates[6] = Math.round(yourTeamWinRates[6]);
        enemyTeamWinRates[0] = Math.round(enemyTeamWinRates[0]);
        enemyTeamWinRates[1] = Math.round(enemyTeamWinRates[1]);
        enemyTeamWinRates[2] = Math.round(enemyTeamWinRates[2]);
        enemyTeamWinRates[3] = Math.round(enemyTeamWinRates[3]);
        enemyTeamWinRates[4] = Math.round(enemyTeamWinRates[4]);
        enemyTeamWinRates[5] = Math.round(enemyTeamWinRates[5]);
        enemyTeamWinRates[6] = Math.round(enemyTeamWinRates[6]);
        updateGradient(yourTeamWinRates, 'gradient3');
        updateGradient(enemyTeamWinRates, 'gradient4');
      });
      fetch('/data/champion-comps.json').then(response => response.json()).then(data => {
        if(gameData.team_color === 'blue') {
          findChampionComps(gameData.blue_team, gameData.red_team, data);
        }else {
          findChampionComps(gameData.red_team, gameData.blue_team, data);
        }
      });
      getItemBuild(gameData.red_team, gameData.blue_team, gameData.team_color, gameData.jungler_blue, gameData.jungler_red, gameData.playingChamp)
    } else {
      await delay(1500);
      if (loadTimes < 4 && response.status === 500) {
        loadTimes++;
        searchLiveGame();
      } else {
        document.getElementById("status").innerText =
        `${summonerName} is not currently in game. Try again when the Loading Screen appears.`;
        document.querySelector('#search-game-btn input').disabled = false;
        document.querySelector('#search-game-btn input').checked = false;
        document.querySelector('#search-game-btn').addEventListener('click', initiateSearch);
      }
    }
  } catch (error) {
    document.getElementById("status").innerText =
      "An error has occurred, please try again in a few minutes.";
    document.querySelector('#search-game-btn input').disabled = false;
    document.querySelector('#search-game-btn input').checked = false;
    document.querySelector('#search-game-btn').addEventListener('click', initiateSearch);
  }
}

async function generateAnalysis(
  playingChamp,
  enemyLaner,
  playingPosition
) {
  try {
    const response = await fetch("/get-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summonerId: summonerId,
        tag: tag,
        region: region,
        playingChamp: playingChamp,
        enemyLaner: enemyLaner,
        playingPosition: playingPosition
      }),
    });
    if (response.ok) {
      if (response.status === 200) {
        const responseText = await response.text();
        console.log(responseText);
        const regexTip1 = /<tip1>(.*?)<\/tip1>/;
        const regexTip2 = /<tip2>(.*?)<\/tip2>/;
        const regexTip3 = /<tip3>(.*?)<\/tip3>/;
        const tip1 = responseText.match(regexTip1)?.[1];
        const tip2 = responseText.match(regexTip2)?.[1];
        const tip3 = responseText.match(regexTip3)?.[1];
        const analysis = {
          tip1: tip1,
          tip2: tip2,
          tip3: tip3
        };
        document.querySelectorAll('.skeleton-text').forEach(el => el.style.display = 'none');
        let counter = 0;
        for (let key in analysis) {
          if (analysis.hasOwnProperty(key)) {
            if(counter < 5){
              document.getElementById(key).innerHTML = analysis[key];
              counter++
            } else {
              document.getElementById(key).innerHTML = analysis[key];
            }
          }
        }
      } else {
        // Handle other non-ok responses
        throw new Error(`HTTP error: ${response.status}`);
      }
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function getItemBuild(
  red_team,
  blue_team,
  team_color,
  jungler_blue,
  jungler_red,
  playingChamp,
) {
  try {
    const response = await fetch("/get-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summonerId: summonerId,
        tag: tag,
        region: region,
        red_team: red_team,
        blue_team: blue_team,
        team_color: team_color,
        jungler_blue: jungler_blue,
        jungler_red: jungler_red,
        playingChamp: playingChamp
      }),
    });
    if (response.ok) {
      if (response.status === 200) {
        const items = await response.json();
        for (let key in items) {
          if (items.hasOwnProperty(key)) {
            let itemId = items[key].id;
            let itemName = items[key].name;
            let itemDescription = items[key].description;
            document.getElementById(key).src = `http://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${itemId}.png`;
            document.getElementById(`description-${key}`).innerHTML = `<span style="font-size:16px; font-weight: bold; line-height: 25px;">${itemName}</span>${itemDescription}`;
          }
        }
      } else {
        // Handle other non-ok responses
        throw new Error(`HTTP error: ${response.status}`);
      }
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function initiateSearch() {
  loadTimes = 0;
  searchLiveGame();
}

document.getElementById("search-game-btn").addEventListener("click", initiateSearch);

searchLiveGame();

document.addEventListener('DOMContentLoaded', function() {
  const reloadButton = document.getElementById('reload-btn');
  reloadButton.addEventListener('click', () => {
    location.reload();
  });
});

function championPerformanceGradient(winRates, sensitivity = 0.2) {
  const average = winRates.reduce((acc, rate) => acc + rate, 0) / winRates.length;
  const range = Math.max(...winRates) - Math.min(...winRates);
  const rangePortion = range * sensitivity;
  const thresholds = {
      moderateUpperThreshold: average + rangePortion,
      moderateLowerThreshold: average - rangePortion
  };

  return winRates.map(rate => {
      if (rate > thresholds.moderateUpperThreshold) return '#3CC848';
      if (rate < thresholds.moderateLowerThreshold) return '#C8453C';
      return '#C89C3C';
  });
}

function updateGradient(winRates, selector) {
  const colors = championPerformanceGradient(winRates);
  const gradientBar = document.querySelector(`#${selector}`);

  let gradient = 'linear-gradient(to right';
  let colorStops = colors.map((color, index, array) => {
      const positionStart = (index / array.length) * 100;
      const positionEnd = ((index + 1) / array.length) * 100;
      const nextColor = array[index + 1] ? array[index + 1] : array[index];
      return `${color} ${positionStart}%, ${nextColor} ${positionEnd}%`;
  }).join(', ');

  gradientBar.style.background = `${gradient}, ${colorStops})`;
}

function findChampionComps(yourTeam, enemyTeam, championComps) {
  let teamComps = {
    your_team_comps: {"Attack": 0, "Catch": 0, "Protect": 0, "Siege": 0, "Split": 0},
    enemy_team_comps: {"Attack": 0, "Catch": 0, "Protect": 0, "Siege": 0, "Split": 0},
  };
  yourTeam.forEach((champion) => {
    const attackComp = championComps[champion].Comps.Attack;
    const catchComp = championComps[champion].Comps.Catch;
    const protectComp = championComps[champion].Comps.Protect;
    const siegeComp = championComps[champion].Comps.Siege;
    const splitComp = championComps[champion].Comps.Split;
    teamComps.your_team_comps.Attack += attackComp;
    teamComps.your_team_comps.Catch += catchComp;
    teamComps.your_team_comps.Protect += protectComp;
    teamComps.your_team_comps.Siege += siegeComp;
    teamComps.your_team_comps.Split += splitComp;
  }
  );
  enemyTeam.forEach((champion) => {
    const attackComp = championComps[champion].Comps.Attack;
    const catchComp = championComps[champion].Comps.Catch;
    const protectComp = championComps[champion].Comps.Protect;
    const siegeComp = championComps[champion].Comps.Siege;
    const splitComp = championComps[champion].Comps.Split;
    teamComps.enemy_team_comps.Attack += attackComp;
    teamComps.enemy_team_comps.Catch += catchComp;
    teamComps.enemy_team_comps.Protect += protectComp;
    teamComps.enemy_team_comps.Siege += siegeComp;
    teamComps.enemy_team_comps.Split += splitComp;
  }
  );
  const yourTeamSortedComps = Object.entries(teamComps.your_team_comps)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const enemyTeamSortedComps = Object.entries(teamComps.enemy_team_comps)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  const yourPrimaryComp = { [yourTeamSortedComps[0][0]]: yourTeamSortedComps[0][1] };
  const yourSecondaryComp = { [yourTeamSortedComps[1][0]]: yourTeamSortedComps[1][1] };
  const enemyPrimaryComp = { [enemyTeamSortedComps[0][0]]: enemyTeamSortedComps[0][1] };
  const enemySecondaryComp = { [enemyTeamSortedComps[1][0]]: enemyTeamSortedComps[1][1] };

  console.log(yourPrimaryComp, yourSecondaryComp, enemyPrimaryComp, enemySecondaryComp);

  document.getElementById("your-team-comp1").textContent = Object.keys(yourPrimaryComp)[0];
  document.getElementById("your-team-comp2").textContent = Object.keys(yourSecondaryComp)[0];
  document.getElementById("enemy-team-comp1").textContent = Object.keys(enemyPrimaryComp)[0];
  document.getElementById("enemy-team-comp2").textContent = Object.keys(enemySecondaryComp)[0];

  if (yourPrimaryComp.Attack) {
    document.getElementById("your-team-comp1").style.color = "#CC3E22";
  } else if (yourPrimaryComp.Catch) {
    document.getElementById("your-team-comp1").style.color = "#FFE300";
  } else if (yourPrimaryComp.Protect) {
    document.getElementById("your-team-comp1").style.color = "#3cc89b";
  } else if (yourPrimaryComp.Siege) {
    document.getElementById("your-team-comp1").style.color = "#3c9bc8";
  } else if (yourPrimaryComp.Split) {
    document.getElementById("your-team-comp1").style.color = "#AB2DC0";
  } else {
    document.getElementById("your-team-comp1").textContent = "";
  }

  if (yourSecondaryComp.Attack) {
    document.getElementById("your-team-comp2").style.color = "#CC3E22";
  } else if (yourSecondaryComp.Catch) {
    document.getElementById("your-team-comp2").style.color = "#FFE300";
  } else if (yourSecondaryComp.Protect) {
    document.getElementById("your-team-comp2").style.color = "#3cc89b";
  } else if (yourSecondaryComp.Siege) {
    document.getElementById("your-team-comp2").style.color = "#3c9bc8";
  } else if (yourSecondaryComp.Split) {
    document.getElementById("your-team-comp2").style.color = "#AB2DC0";
  } else {
    document.getElementById("your-team-comp2").textContent = "";
  }

  if (enemyPrimaryComp.Attack) {
    document.getElementById("enemy-team-comp1").style.color = "#CC3E22";
  } else if (enemyPrimaryComp.Catch) {
    document.getElementById("enemy-team-comp1").style.color = "#FFE300";
  } else if (enemyPrimaryComp.Protect) {
    document.getElementById("enemy-team-comp1").style.color = "#3cc89b";
  } else if (enemyPrimaryComp.Siege) {
    document.getElementById("enemy-team-comp1").style.color = "#3c9bc8";
  } else if (enemyPrimaryComp.Split) {
    document.getElementById("enemy-team-comp1").style.color = "#AB2DC0";
  } else {
    document.getElementById("enemy-team-comp1").textContent = "";
  }

  if (enemySecondaryComp.Attack) {
    document.getElementById("enemy-team-comp2").style.color = "#CC3E22";
  } else if (enemySecondaryComp.Catch) {
    document.getElementById("enemy-team-comp2").style.color = "#FFE300";
  } else if (enemySecondaryComp.Protect) {
    document.getElementById("enemy-team-comp2").style.color = "#3cc89b";
  } else if (enemySecondaryComp.Siege) {
    document.getElementById("enemy-team-comp2").style.color = "#3c9bc8";
  } else if (enemySecondaryComp.Split) {
    document.getElementById("enemy-team-comp2").style.color = "#AB2DC0";
  } else {
    document.getElementById("enemy-team-comp2").textContent = "";
  }

  if (yourPrimaryComp.Attack && yourSecondaryComp.Catch || yourPrimaryComp.Catch && yourSecondaryComp.Attack) {
    document.getElementById("your-team-comp-description").textContent = "Your team dominates with teamfights using burst damage and crowd control to hard engage and pick off targets.";
  } else if (yourPrimaryComp.Attack && yourSecondaryComp.Split || yourPrimaryComp.Split && yourSecondaryComp.Attack) {
    document.getElementById("your-team-comp-description").textContent = "Your team combines teamfighting with split pushing, forcing enemies to split their focus to creating openings.";
  } else if (yourPrimaryComp.Attack && yourSecondaryComp.Siege || yourPrimaryComp.Siege && yourSecondaryComp.Attack) {
    document.getElementById("your-team-comp-description").textContent = "Your team has good AoE damage and poke to control objectives and force teamfights, and take down enemy structures easily.";
  } else if (yourPrimaryComp.Attack && yourSecondaryComp.Protect || yourPrimaryComp.Protect && yourSecondaryComp.Attack) {
    document.getElementById("your-team-comp-description").textContent = "Your team balances protecting hyper-carries with strong engaging abilities, ensuring carries can deal damage safely in teamfights.";
  } else if (yourPrimaryComp.Split && yourSecondaryComp.Catch || yourPrimaryComp.Catch && yourSecondaryComp.Split) {
    document.getElementById("your-team-comp-description").textContent = "Your team uses a split pusher while the rest of the team can catch out and eliminate isolated enemies.";
  } else if (yourPrimaryComp.Split && yourSecondaryComp.Siege || yourPrimaryComp.Siege && yourSecondaryComp.Split) {
    document.getElementById("your-team-comp-description").textContent = "Your team has side lane pressure while slowly taking down enemy defenses, stretching enemies across the map.";
  } else if (yourPrimaryComp.Split && yourSecondaryComp.Protect || yourPrimaryComp.Protect && yourSecondaryComp.Split) {
    document.getElementById("your-team-comp-description").textContent = "Your team is good at protecting carries while using a split pusher to create cross-map pressure, demanding high coordination.";
  } else if (yourPrimaryComp.Siege && yourSecondaryComp.Catch || yourPrimaryComp.Catch && yourSecondaryComp.Siege) {
    document.getElementById("your-team-comp-description").textContent = "Your team combines poke and burst damage to reduce enemy hp from range then engage to finish off weakened enemies.";
  } else if (yourPrimaryComp.Siege && yourSecondaryComp.Protect || yourPrimaryComp.Protect && yourSecondaryComp.Siege) {
    document.getElementById("your-team-comp-description").textContent = "Your team comp focuses on poking enemies and protecting key carries, using range to control space and safeguard your core damage dealers.";
  } else if (yourPrimaryComp.Protect && yourSecondaryComp.Catch || yourPrimaryComp.Catch && yourSecondaryComp.Protect) {
    document.getElementById("your-team-comp-description").textContent = "Your team is good at protecting carries and use burst damage and mobility to control fights, quickly taking out priority targets.";
  }

  if (enemyPrimaryComp.Attack && enemySecondaryComp.Catch || enemyPrimaryComp.Catch && enemySecondaryComp.Attack) {
    document.getElementById("enemy-team-comp-description").textContent = "Expect frequent teamfights from the enemies with sudden, aggressive engagements. They will punish any mispositioning with CC-lock and burst damage.";
  } else if (enemyPrimaryComp.Attack && enemySecondaryComp.Split || enemyPrimaryComp.Split && enemySecondaryComp.Attack) {
    document.getElementById("enemy-team-comp-description").textContent = "Anticipate a mix of strong teamfight and split pushing. They will try to distract and split your team, engaging when you're vulnerable.";
  } else if (enemyPrimaryComp.Attack && enemySecondaryComp.Siege || enemyPrimaryComp.Siege && enemySecondaryComp.Attack) {
    document.getElementById("enemy-team-comp-description").textContent = "Prepare for heavy teamfighting and pressure on turrents and objectives. They'll aim for fast engages.";
  } else if (enemyPrimaryComp.Attack && enemySecondaryComp.Protect || enemyPrimaryComp.Protect && enemySecondaryComp.Attack) {
    document.getElementById("enemy-team-comp-description").textContent = "Expect them to focus on teamfighting while protecting their carries. They will engage confidently, relying on their carries’ damage output.";
  } else if (enemyPrimaryComp.Split && enemySecondaryComp.Catch || enemyPrimaryComp.Catch && enemySecondaryComp.Split) {
    document.getElementById("enemy-team-comp-description").textContent = "Be ready for a split push game and hard CC-lock attempts on isolated players of your team.";
  } else if (enemyPrimaryComp.Split && enemySecondaryComp.Siege || enemyPrimaryComp.Siege && enemySecondaryComp.Split) {
    document.getElementById("enemy-team-comp-description").textContent = "Watch for split pressure combined with a slow, coordinated siege. They will try to stretch your defenses thin across the map.";
  } else if (enemyPrimaryComp.Split && enemySecondaryComp.Protect || enemyPrimaryComp.Protect && enemySecondaryComp.Split) {
    document.getElementById("enemy-team-comp-description").textContent = "Expect them to protect their main carry while applying pressure with a split pusher. They will try to pull your attention away from objectives.";
  } else if (enemyPrimaryComp.Siege && enemySecondaryComp.Catch || enemyPrimaryComp.Catch && enemySecondaryComp.Siege) {
    document.getElementById("enemy-team-comp-description").textContent = "Prepare for long-range harassment followed by quick engagements. They aim to weaken you with poke before catching out targets.";
  } else if (enemyPrimaryComp.Siege && enemySecondaryComp.Protect || enemyPrimaryComp.Protect && enemySecondaryComp.Siege) {
    document.getElementById("enemy-team-comp-description").textContent = "Anticipate a slow siege where they will poke at your defenses while prioritizing the safety of their carries.";
  } else if (enemyPrimaryComp.Protect && enemySecondaryComp.Catch || enemyPrimaryComp.Catch && enemySecondaryComp.Protect) {
    document.getElementById("enemy-team-comp-description").textContent = "Expect them to focus on protecting their key carries while also looking for opportunities to burst down your team quickly with mobility and control.";
  }
};

function assignPositions(team, jungler, championPositions) {
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
  
  return assignments;
}