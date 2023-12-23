const summonerInfo = document.getElementById('summonerInfo');
const region = summonerInfo.getAttribute('data-region');
const summonerId = summonerInfo.getAttribute('data-summoner-id');

async function searchLiveGame() {
  document.getElementById('search-game-btn').style.display = 'none';
  document.getElementById('status').innerText = "Searching...";
  document.getElementById('loading-animation').style.display = 'flex';
  try {
    const response = await fetch(`/api/id/${summonerId}/${region}`, { method: 'GET'});

    if (!response.ok) {
      if (response.status === 408) {
        document.getElementById('status').innerText = "Match starting soon. Try again when the Loading Screen appears.";
        document.getElementById('search-game-btn').style.display = 'flex';
        document.getElementById('loading-animation').style.display = 'none';
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } else {
      const liveGameJSON = await response.json();
      document.getElementById('loading').style.display = 'none';
      document.getElementById('main').style.display = 'block';
      showTeams(liveGameJSON);
      if (response.status === 202) {
        showAnalysis(JSON.parse(liveGameJSON.analysis), liveGameJSON.team_color);
      } else {
        document.getElementById('status').innerText = "Match starting soon. Try again when the Loading Screen appears.";
        document.getElementById('search-game-btn').style.display = 'flex';
        document.getElementById('loading-animation').style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Fetch error: ', error);
    document.getElementById('status').innerText = "Match starting soon. Try again when the Loading Screen appears.";
    document.getElementById('search-game-btn').style.display = 'flex';
    document.getElementById('loading-animation').style.display = 'none';
  }
}

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
}

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
  const redEarly = document.getElementById("red-early");
  const redEarlyMid = document.getElementById("red-early-mid");
  const redMid = document.getElementById("red-mid");
  const redMidLate = document.getElementById("red-mid-late");
  const redLate = document.getElementById("red-late");
  const blueEarly = document.getElementById("blue-early");
  const blueEarlyMid = document.getElementById("blue-early-mid");
  const blueMid = document.getElementById("blue-mid");
  const blueMidLate = document.getElementById("blue-mid-late");
  const blueLate = document.getElementById("blue-late");
  if (analysis.red.power_spikes.early === 0) {
    redEarly.style.backgroundColor = "#c8453c";
  } else if (analysis.red.power_spikes.early === 1) {
    redEarly.style.backgroundColor = "#c89c3c";
  } else if (analysis.red.power_spikes.early === 2) {
    redEarly.style.backgroundColor = "#3cc848";
  } else {
    redEarly.style.backgroundColor = "#000";
  }
  if (analysis.red.power_spikes.early_mid === 0) {
    redEarlyMid.style.backgroundColor = "#c8453c";
  } else if (analysis.red.power_spikes.early_mid === 1) {
    redEarlyMid.style.backgroundColor = "#c89c3c";
  } else if (analysis.red.power_spikes.early_mid === 2) {
    redEarlyMid.style.backgroundColor = "#3cc848";
  } else {
    redEarlyMid.style.backgroundColor = "#000";
  }
  if (analysis.red.power_spikes.mid === 0) {
    redMid.style.backgroundColor = "#c8453c";
  } else if (analysis.red.power_spikes.mid === 1) {
    redMid.style.backgroundColor = "#c89c3c";
  } else if (analysis.red.power_spikes.mid === 2) {
    redMid.style.backgroundColor = "#3cc848";
  } else {
    redMid.style.backgroundColor = "#000";
  }
  if (analysis.red.power_spikes.mid_late === 0) {
    redMidLate.style.backgroundColor = "#c8453c";
  } else if (analysis.red.power_spikes.mid_late === 1) {
    redMidLate.style.backgroundColor = "#c89c3c";
  } else if (analysis.red.power_spikes.mid_late === 2) {
    redMidLate.style.backgroundColor = "#3cc848";
  } else {
    redMidLate.style.backgroundColor = "#000";
  }
  if (analysis.red.power_spikes.late === 0) {
    redLate.style.backgroundColor = "#c8453c";
  } else if (analysis.red.power_spikes.late === 1) {
    redLate.style.backgroundColor = "#c89c3c";
  } else if (analysis.red.power_spikes.late === 2) {
    redLate.style.backgroundColor = "#3cc848";
  } else {
    redLate.style.backgroundColor = "#000";
  }
  if (analysis.blue.power_spikes.early === 0) {
    blueEarly.style.backgroundColor = "#c8453c";
  } else if (analysis.blue.power_spikes.early === 1) {
    blueEarly.style.backgroundColor = "#c89c3c";
  } else if (analysis.blue.power_spikes.early === 2) {
    blueEarly.style.backgroundColor = "#3cc848";
  } else {
    blueEarly.style.backgroundColor = "#000";
  }
  if (analysis.blue.power_spikes.early_mid === 0) {
    blueEarlyMid.style.backgroundColor = "#c8453c";
  } else if (analysis.blue.power_spikes.early_mid === 1) {
    blueEarlyMid.style.backgroundColor = "#c89c3c";
  } else if (analysis.blue.power_spikes.early_mid === 2) {
    blueEarlyMid.style.backgroundColor = "#3cc848";
  } else {
    blueEarlyMid.style.backgroundColor = "#000";
  }
  if (analysis.blue.power_spikes.mid === 0) {
    blueMid.style.backgroundColor = "#c8453c";
  } else if (analysis.blue.power_spikes.mid === 1) {
    blueMid.style.backgroundColor = "#c89c3c";
  } else if (analysis.blue.power_spikes.mid === 2) {
    blueMid.style.backgroundColor = "#3cc848";
  } else {
    blueMid.style.backgroundColor = "#000";
  }
  if (analysis.blue.power_spikes.mid_late === 0) {
    blueMidLate.style.backgroundColor = "#c8453c";
  } else if (analysis.blue.power_spikes.mid_late === 1) {
    blueMidLate.style.backgroundColor = "#c89c3c";
  } else if (analysis.blue.power_spikes.mid_late === 2) {
    blueMidLate.style.backgroundColor = "#3cc848";
  } else {
    blueMidLate.style.backgroundColor = "#000";
  }
  if (analysis.blue.power_spikes.late === 0) {
    blueLate.style.backgroundColor = "#c8453c";
  } else if (analysis.blue.power_spikes.late === 1) {
    blueLate.style.backgroundColor = "#c89c3c";
  } else if (analysis.blue.power_spikes.late === 2) {
    blueLate.style.backgroundColor = "#3cc848";
  } else {
    blueLate.style.backgroundColor = "#000";
  }
  document.getElementById("red-comp").innerHTML = "";
  document.getElementById("blue-comp").innerHTML = "";
  document.getElementById("general-strategy").innerHTML = "";
  document.getElementById("warnings").innerHTML = "";
  document.getElementById("earlygame-strategy").innerHTML = "";
  document.getElementById("earlygame-objectives").innerHTML = "";
  document.getElementById("midgame-objectives").innerHTML = "";
  document.getElementById("lategame-strategy").innerHTML = "";
  typewriterEffect("red-comp", analysis.red.composition_type, 50);
  typewriterEffect("blue-comp", analysis.blue.composition_type, 50);
  typewriterEffect(
    "general-strategy",
    analysis[team_color].general_game_strategy,
    10
  );
  typewriterEffect(
    "warnings",
    analysis[team_color].general_warnings,
    10
  );
  typewriterEffect(
    "earlygame-strategy",
    analysis[team_color].earlygame_strategy,
    10
  );
  typewriterEffect(
    "earlygame-objectives",
    analysis[team_color].earlygame_objectives,
    10
  );
  typewriterEffect(
    "midgame-objectives",
    analysis[team_color].midgame_objectives,
    10
  );
  typewriterEffect(
    "lategame-strategy",
    analysis[team_color].lategame_strategy,
    10
  );
}

function typewriterEffect(elementId, text, speed) {
  let index = 0;
  let element = document.getElementById(elementId);
  let words = text.split(' '); // Split the text by spaces into an array of words
  let interval = setInterval(function () {
    if (index < words.length) {
      let nextWord = words[index];
        // Add the next word with a space
        element.innerHTML += nextWord + " ";
        index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

document.getElementById('search-game-btn').addEventListener('click', () => {
  searchLiveGame();
})

searchLiveGame();

const chartConfBlue = {
  type: "radar",
  data: {
      labels: ["Damage", "Toughness", "Crowd Control", "Mobility", "Utility"],
      datasets: [
          {
              label: "Team Stats",
              data: [6, 2, 4, 6, 1],
              backgroundColor: "rgba(0, 90, 130, 0.3)",
              borderColor: "rgba(200, 155, 60, 0.4)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(200, 155, 60, 0.7)",
              pointBorderColor: "rgba(200, 155, 60, 0.7)",
          },
      ],
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInOutBounce",
        from: 1,
        to: 0.07,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 6,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          color: "rgba(160, 155, 140, 0.1)",
        },
        pointLabels: {
          display: true,
          font: {
            size: 10,
            family: "Inria Sans",
            weight: "bold",
          },
          color: "rgba(160, 155, 140, 1)",
        },
        angleLines: {
          display: true,
          color: "rgba(160, 155, 140, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const customText = {
              Damage:
                "The team's overall ability to deal damage to enemy team",
              Toughness:
                "The team's overall ability to absorb damage from the enemy team",
              "Crowd Control":
                "The team's overall ability to apply harmful effects like slows and stuns to the enemy team",
              Mobility:
                "The team's overall ability to move quickly around the map",
              Utility:
                "The team's overall ability to grant beneficial effects like shields, healing, or movement speed",
            };
            return `${customText[label]}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  },
};

const chartConfRed = {
  type: "radar",
  data: {
      labels: ["Damage", "Toughness", "Crowd Control", "Mobility", "Utility"],
      datasets: [
          {
              label: "Team Stats",
              data: [2, 5, 4, 2, 4],
              backgroundColor: "rgba(233, 66, 46, 0.3)",
              borderColor: "rgba(200, 155, 60, 0.4)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(200, 155, 60, 0.7)",
              pointBorderColor: "rgba(200, 155, 60, 0.7)",
          },
      ],
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInOutBounce",
        from: 1,
        to: 0.07,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 6,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          color: "rgba(160, 155, 140, 0.1)",
        },
        pointLabels: {
          display: true,
          font: {
            size: 10,
            family: "Inria Sans",
            weight: "bold",
          },
          color: "rgba(160, 155, 140, 1)",
        },
        angleLines: {
          display: true,
          color: "rgba(160, 155, 140, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const customText = {
              Damage:
                "The team's overall ability to deal damage to enemy team",
              Toughness:
                "The team's overall ability to absorb damage from the enemy team",
              "Crowd Control":
                "The team's overall ability to apply harmful effects like slows and stuns to the enemy team",
              Mobility:
                "The team's overall ability to move quickly around the map",
              Utility:
                "The team's overall ability to grant beneficial effects like shields, healing, or movement speed",
            };
            return `${customText[label]}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  },
};

const blueChartCTX = document.getElementById("blue-chart").getContext("2d");
const redChartCTX = document.getElementById("red-chart").getContext("2d");
const blueChart = new Chart(blueChartCTX, chartConfBlue);
const redChart = new Chart(redChartCTX, chartConfRed);