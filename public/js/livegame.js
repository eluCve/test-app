const summonerInfo = document.getElementById("summonerInfo");
const region = summonerInfo.getAttribute("data-region");
const summonerId = summonerInfo.getAttribute("data-summoner-id");
const summonerName = summonerInfo.getAttribute("data-summoner-name");
const tag = summonerInfo.getAttribute("data-tag");

let loadTimes = 0;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function searchLiveGame() {
  document.getElementById("search-game-btn").style.display = "none";
  document.getElementById("status").innerText = "Searching...";
  document.getElementById("loading-animation").style.display = "flex";
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
      document.getElementById('background-image').style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${gameData.playingChamp}_0.jpg')`;;
      if(gameData.team_color === 'red') {
        blueChart.data.datasets[0].data = gameData.red_team_power;
        blueChart.update();
        redChart.data.datasets[0].data = gameData.blue_team_power;
        redChart.update();
      } else {
        blueChart.data.datasets[0].data = gameData.blue_team_power;
        blueChart.update();
        redChart.data.datasets[0].data = gameData.red_team_power;
        redChart.update();
      }

      generateAnalysis(gameData.red_team, gameData.blue_team, gameData.team_color, gameData.jungler_blue, gameData.jungler_red, gameData.playingChamp)
      getItemBuild(gameData.red_team, gameData.blue_team, gameData.team_color, gameData.jungler_blue, gameData.jungler_red, gameData.playingChamp)
      getTeamPowers(gameData.red_team, gameData.blue_team, gameData.team_color)
    } else {
      await delay(1500);
      if (loadTimes < 4 && response.status === 500) {
        loadTimes++;
        searchLiveGame();
      } else {
        document.getElementById("status").innerText =
        `${summonerName} is not currently in game. Try again when the Loading Screen appears.`;
        document.getElementById("search-game-btn").style.display = "flex";
        document.getElementById("loading-animation").style.display = "none";
      }
    }
  } catch (error) {
    document.getElementById("status").innerText =
      "An error has occurred, please try again in a few minutes.";
    document.getElementById("search-game-btn").style.display = "flex";
    document.getElementById("loading-animation").style.display = "none";
  }
}

async function generateAnalysis(
  red_team,
  blue_team,
  team_color,
  jungler_blue,
  jungler_red,
  playingChamp,
) {
  try {
    const response = await fetch("/get-analysis", {
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
        const analysis = await response.json();
        function transformTip(tip) {
          let colonIndex = tip.indexOf(":");
          return `<span style="color: #1FC1A2; font-size: 16px; font-weight: 400; letter-spacing: 0.3px; font-family: Roboto;">${tip.substring(0, colonIndex + 1)}</span>${tip.substring(colonIndex + 1)}`;
        }
        function transformWarning(tip) {
          let colonIndex = tip.indexOf(":");
          return `<span style="color: #FF6174; font-size: 16px; font-weight: 400; letter-spacing: 0.3px; font-family: Roboto;">${tip.substring(0, colonIndex + 1)}</span>${tip.substring(colonIndex + 1)}`;
        }
        document.querySelectorAll('.skeleton-text').forEach(el => el.style.display = 'none');
        let counter = 0;
        for (let key in analysis) {
          if (analysis.hasOwnProperty(key)) {
            if(counter < 5){
              document.getElementById(key).innerHTML = transformTip(analysis[key]);
              counter++
            } else {
              document.getElementById(key).innerHTML = transformWarning(analysis[key]);
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
            let itemReason = items[key].reason;
            let itemName = items[key].name;
            let itemDescription = items[key].description;
            document.getElementById(key).src = `http://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${itemId}.png`;
            document.getElementById(`reason-${key}-img`).src = `http://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${itemId}.png`;
            document.getElementById(`reason-${key}`).innerText = itemReason;
            document.getElementById('items-headline').innerText = 'Item Build Generated';
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

async function getTeamPowers(
  red_team,
  blue_team,
  team_color
) {
  try {
    const response = await fetch("/get-teams-power", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summonerId: summonerId,
        tag: tag,
        region: region,
        red_team: red_team,
        blue_team: blue_team,
      }),
    });
    if (response.ok) {
      if (response.status === 200) {
        const teamPowers = await response.json();
        const powerColors = {
          0: "#c8453c",
          1: "#c89c3c",
          2: "#3cc848",
          default: "#000"
        };
        function setPowerSpikeColor(element, value) {
          element.style.background = powerColors[value] || powerColors.default;
        }
        const redElements = ["red-early", "red-early_mid", "red-mid", "red-mid_late", "red-late"];
        const blueElements = ["blue-early", "blue-early_mid", "blue-mid", "blue-mid_late", "blue-late"];
        if(team_color === 'red'){
          redElements.forEach(id => {
            const element = document.getElementById(id);
            const value = teamPowers.blue[id.split('-')[1]];
            setPowerSpikeColor(element, value);
          });
          
          blueElements.forEach(id => {
            const element = document.getElementById(id);
            const value = teamPowers.red[id.split('-')[1]];
            setPowerSpikeColor(element, value);
          });
        } else {
          redElements.forEach(id => {
            const element = document.getElementById(id);
            const value = teamPowers.red[id.split('-')[1]];
            setPowerSpikeColor(element, value);
          });
          
          blueElements.forEach(id => {
            const element = document.getElementById(id);
            const value = teamPowers.blue[id.split('-')[1]];
            setPowerSpikeColor(element, value);
          });
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

document.getElementById("search-game-btn").addEventListener("click", () => {
  loadTimes = 0;
  searchLiveGame();
});

searchLiveGame();

const chartConfBlue = {
  type: "radar",
  data: {
      labels: ["Damage", "Toughness", "Crowd Control", "Mobility", "Utility"],
      datasets: [
          {
              label: "Team Stats",
              data: [6, 6, 6, 6, 6],
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
              data: [6, 6, 6, 6, 6],
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

document.addEventListener('DOMContentLoaded', function() {
  var reloadButton = document.querySelector('.button-new'); // Select the button
  if (reloadButton) {
      reloadButton.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent the default anchor action
          window.location.reload(); // Reload the page
      });
  }
  // First, we select all elements with the class that starts with 'reason-item'
  const reasonItems = document.querySelectorAll('[class^="reason-item"]');

  // Function to remove the 'selected' class from all items and hide all paragraphs
  function deselectAll() {
    reasonItems.forEach(item => {
      item.classList.remove('selected'); // Remove 'selected' class from every item
    });

    // Hide all paragraphs
    for(let i = 1; i <= 6; i++) {
      document.getElementById(`reason-item${i}`).style.display = 'none';
    }
  }

  // Function to add 'selected' class to clicked item and show the corresponding paragraph
  function selectItem(item) {
    const itemId = item.classList[0]; // Assuming the first class is the item's identifier
    // Add 'selected' class to the clicked item
    item.classList.add('selected');
    // Display the corresponding paragraph
    document.getElementById(itemId).style.display = 'block';
  }

  // Add event listener to each item
  reasonItems.forEach(item => {
    item.addEventListener('click', () => {
      deselectAll(); // Deselect all items and hide all paragraphs
      selectItem(item); // Select clicked item and show corresponding paragraph
    });
  });
});


  
  

  
