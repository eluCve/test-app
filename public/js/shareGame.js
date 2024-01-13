const summonerInfo = document.getElementById('summonerInfo');
const region = summonerInfo.getAttribute('data-region');
const summonerName = summonerInfo.getAttribute('data-summoner-name');
const tag = summonerInfo.getAttribute('data-tag');

async function searchLiveGame() {
  document.getElementById('search-game-btn').style.display = 'none';
  document.getElementById('status').innerText = "Searching...";
  document.getElementById('loading-animation').style.display = 'flex';
  try {
    const response = await fetch(`/api/id/${summonerName}/${region}/${tag}`, { method: 'GET'});

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