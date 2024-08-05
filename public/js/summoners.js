let leagueVersion = '';

const rankColors = {
    IRON: '#D8B1B1',
    BRONZE: '#F9AE91',
    SILVER: '#99A0D2',
    GOLD: '#C49359',
    PLATINUM: '#237E8E',
    EMERALD: '#53BDB3',
    DIAMOND: '#39B1E9',
    MASTER: '#EA44F5',
    GRANDMASTER: '#D54A45',
    CHALLENGER: '#E8B141'
}

document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('search-summoner').addEventListener('submit', async function(e) {
        e.preventDefault();
        const summoner = document.getElementById('summonerName').value.replace(/\s/g, "%20");
        const region = document.getElementById('serverSelect').value;
        const tag = document.getElementById('tag').value;
        const trimmedsummoner = summoner.trim();
        const trimmedTag = tag.trim();
        const cleanedTag = trimmedTag.startsWith('#') ? trimmedTag.slice(1) : trimmedTag;
        window.location.href = `/summoners/${region}/${trimmedsummoner}/${cleanedTag}`;
    });

    document.getElementById('update-btn').addEventListener('click', () => {
        location.reload();
    });

    leagueVersion = await getLatestLeagueVersion();
    const attribues = document.getElementById('summonerInfo');
    const region = attribues.getAttribute('data-region');
    const riotGameName = attribues.getAttribute('data-riotName');
    const riotTagLine = attribues.getAttribute('data-riotTag');
    const summonerPuuid = attribues.getAttribute('data-puuid');
    const accountTier = attribues.getAttribute('data-accountTier');
    const accountRank = attribues.getAttribute('data-accountRank');
    const accountLP = attribues.getAttribute('data-accountLP');
    const accountWins = attribues.getAttribute('data-accountWins');
    const accountLosses = attribues.getAttribute('data-accountLosses');
    const accountWinrate = attribues.getAttribute('data-accountWinrate');
    const summonerIcon = attribues.getAttribute('data-summonerIcon');
    const summonerLevel = attribues.getAttribute('data-summonerLevel');

    doughnutCart('winrate-chart', [accountWins, accountLosses]);
    document.getElementById('overall-winrate').innerText = `${accountWinrate}%`;
    document.getElementById('overall-total-games').innerText = `${parseInt(accountWins) + parseInt(accountLosses)}G ${accountWins}W ${accountLosses}L`;

    document.getElementById('summoner-icon').src = `https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${summonerIcon}.png`;
    document.getElementById('summoner-name').innerText = `${decodeURIComponent(riotGameName)}  #${riotTagLine}`;
    document.getElementById('summoner-level').innerText = `${summonerLevel}`;
    document.getElementById('region').innerText = region;

    document.querySelector('#current-rank img').src = `/assets/rank_${accountTier.toLocaleLowerCase()}.png`;
    const currentRank = document.querySelector('#current-rank p');
    currentRank.innerHTML = `${accountTier} ${accountRank} <span style="color: #000000; font-weight: 400;">(${accountLP}LP)</span>`;
    currentRank.style.color = rankColors[accountTier];    

    const loadMore = document.getElementById('load-more-btn');
    const loader = document.getElementById('loader');

    fetch('/matches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ region: region, puuid: summonerPuuid, start: 0, end: 20 })
    })
    .then(response => {
        if (response.status === 205) {
            loadMore.style.display = 'none';
            loader.style.display = 'none';
            document.getElementById('no-matches').style.display = 'flex';
            throw new Error('No more matches found');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        createMatchElement(data, summonerPuuid, accountTier, accountRank, region);
    }).then(() => {
        loader.style.display = 'none';
        loadMore.style.display = 'flex';
        let matches = document.querySelectorAll('.match-container');
        document.getElementById('score-averages').innerText = `Last ${matches.length} Matches Averages`;
        let wins = document.querySelectorAll('.win-match');
        document.getElementById('account-stats-title').innerHTML = `Recent ${matches.length} Matches Stats ${matches.length < 20 ? `<span style="font-size: 12px; color: #666666;">(${20 - matches.length} match(es) didn't show up due to insufficient data)</span>` : ``}`;
        doughnutCart('recent-winrate-chart', [wins.length, matches.length - wins.length]);
        document.getElementById('recent-overall-winrate').innerText = `${Math.round(wins.length / matches.length * 100)}%`;
        document.getElementById('recent-overall-total-games').innerText = `${matches.length}G ${wins.length}W ${matches.length - wins.length}L`;
        calculatePlayerOverallStats();
        calculateAccountHealth();
        chartIds.forEach(createChart);
    })
    .catch(error => {
        console.log(error);
    });

    let nextLoad = 10;

    loadMore.addEventListener('click', function() {
        loader.style.display = 'flex';
        loadMore.style.display = 'none';
        if (nextLoad >= 100) {
            loadMore.style.display = 'none';
            loader.style.display = 'none';
            document.getElementById('no-matches').style.display = 'flex';
            return;
        }
        fetch('/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ region: region, puuid: summonerPuuid, start: nextLoad, end: 10 })
        })
        .then(response => {
            if (response.status === 205) {
                loadMore.style.display = 'none';
                loader.style.display = 'none';
                document.getElementById('no-matches').style.display = 'flex';
                throw new Error('No more matches found');
            }
            return response.json();
        })
        .then(data => {
            loader.style.display = 'none';
            loadMore.style.display = 'flex';
            createMatchElement(data, summonerPuuid, accountTier, accountRank, region);
            nextLoad += 10;
        })
        .catch(error => {
            console.log(error);
        });
    });
    loader.style.display = 'none';
    loadMore.style.display = 'flex';
});

function showPopup(element) {
    const popup = document.getElementById('popup');
    element.addEventListener('mouseenter', () => {
        const laneDominance = element.getAttribute('data-lane-dominance');
        const farmingEfficiency = element.getAttribute('data-farming-efficiency');
        const objectiveContribution = element.getAttribute('data-objective-contribution');
        const combatEffectiveness = element.getAttribute('data-combat-effectiveness');
        const teamfightContribution = element.getAttribute('data-teamfight-contribution');
        const visionScore = element.getAttribute('data-vision-score');
        const totalScore = element.getAttribute('data-total-score');
        const playerName = element.getAttribute('data-riotGameName');
        const kda = element.getAttribute('data-kda');
        const profileIcon = element.getAttribute('data-profileIcon');

        const percentages = {
            laneDominance: {
                value: laneDominance/2500,
                color: '#000'
            },
            farmingEfficiency: {
                value: farmingEfficiency/2500,
                color: '#000'
            },
            objectiveContribution: {
                value: objectiveContribution/2500,
                color: '#000'
            },
            combatEffectiveness: {
                value: combatEffectiveness/2500,
                color: '#000'
            },
            teamfightContribution: {
                value: teamfightContribution/2500,
                color: '#000'
            },
            visionScore: {
                value: visionScore/2500,
                color: '#000'
            },
            totalScore: {
                value: totalScore/2500,
                color: '#000'
            }
        };

        

        Object.entries(percentages).forEach(([key, percentage]) => {
            if (percentage.value >= 1) {
                percentage.value = 1;
            }
            if (percentage.value >= 0 && percentage.value < 0.25) {
                percentages[key].color = '#FF3A3A';
            } else if (percentage.value >= 0.25 && percentage.value < 0.5) {
                percentages[key].color = '#FF753A';
            } else if (percentage.value >= 0.5 && percentage.value < 0.75) {
                percentages[key].color = '#FFF83A';
            } else if (percentage.value >= 0.75 && percentage.value < 1) {
                percentages[key].color = '#4BFF3A';
            } else {
                percentages[key].color = '#FF3ACE';
            }
        });

        updateChart('popup-laning-dominance-score-chart', [percentages.laneDominance.value, 1 - percentages.laneDominance.value], percentages.laneDominance.color);
        updateChart('popup-farming-efficiency-score-chart', [percentages.farmingEfficiency.value, 1 - percentages.farmingEfficiency.value], percentages.farmingEfficiency.color);
        updateChart('popup-objectives-contribution-chart', [percentages.objectiveContribution.value, 1 - percentages.objectiveContribution.value], percentages.objectiveContribution.color);
        updateChart('popup-combat-effectiveness-score-chart', [percentages.combatEffectiveness.value, 1 - percentages.combatEffectiveness.value], percentages.combatEffectiveness.color);
        updateChart('popup-teamfight-contribution-score-chart', [percentages.teamfightContribution.value, 1 - percentages.teamfightContribution.value], percentages.teamfightContribution.color);
        updateChart('popup-vision-score-chart', [percentages.visionScore.value, 1 - percentages.visionScore.value], percentages.visionScore.color);
        updateChart('popup-total-score-chart', [percentages.totalScore.value, 1 - percentages.totalScore.value], percentages.totalScore.color);

        document.getElementById('popup-lane-dominance-score').innerText = laneDominance;
        document.getElementById('popup-farming-efficiency-score').innerText = farmingEfficiency;
        document.getElementById('popup-objective-contribution-score').innerText = objectiveContribution;
        document.getElementById('popup-combat-effectiveness-score').innerText = combatEffectiveness;
        document.getElementById('popup-teamfight-contribution-score').innerText = teamfightContribution;
        document.getElementById('popup-vision-score').innerText = visionScore;
        document.getElementById('popup-total-score').innerText = totalScore;
        document.getElementById('popup-playername').innerText = playerName;
        document.getElementById('popup-kda').innerText = `KDA: ${kda}`;
        document.getElementById('popup-profile-img').src = `http://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/profileicon/${profileIcon}.png`;

        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        if (rect.top - 320 < 0) {
            popup.style.top = rect.top + 30 + scrollTop + 'px';
            document.getElementById('popup-arrow').style.transform = 'rotate(180deg)';
            document.getElementById('popup-arrow').style.top = '-10px';
        } else {
            popup.style.top = rect.top - 320 + scrollTop + 'px';
            document.getElementById('popup-arrow').style.transform = 'rotate(0deg)';
            document.getElementById('popup-arrow').style.top = '295px';
        }

        popup.style.left = rect.right - 140 + scrollLeft + 'px';
        popup.style.display = 'flex';
        element.style.fontWeight = 'bold';
    });

    element.addEventListener('mouseleave', function() {
        popup.style.display = 'none';
        element.style.fontWeight = 'normal';
    });
}

// CHART SETTINGS
const chartInstances = {};

const chartConfig = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [70, 30],
            backgroundColor: ['#53BDFF', '#ffffff'],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '80%',
        circumference: 180,
        rotation: -90,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    }
};

function createChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const chart = new Chart(ctx, chartConfig);
    chartInstances[canvasId] = chart;
}

const chartIds = [
    'popup-laning-dominance-score-chart',
    'popup-farming-efficiency-score-chart',
    'popup-objectives-contribution-chart',
    'popup-combat-effectiveness-score-chart',
    'popup-teamfight-contribution-score-chart',
    'popup-vision-score-chart',
    'popup-total-score-chart'
];


function updateChart(chartId, data, backgroundColor) {
    const chart = chartInstances[chartId];
    if (chart) {
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = [backgroundColor, '#ffffff'];
        chart.update();
    } else {
        console.error(`Chart with ID ${chartId} not found.`);
    }
}

async function getLatestLeagueVersion() {
    try {
      const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const versions = await response.json();
      const latestVersion = versions[0];  // The first element is the latest version
      return latestVersion;
    } catch (error) {
      console.error('Error fetching League version:', error);
      return null;
    }
  }

  
function formatGameDuration(gameDuration) {
    var minutes = Math.floor(gameDuration / 60);
    var seconds = gameDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function createMatchElement (data, summonerPuuid, tier, rank, region) {
    data.forEach(match => {
        const teamBlue = match.blueTeam;
        const teamRed = match.redTeam;
        let teamBlueHTML = "";
        let teamRedHTML = "";
        const teamWin = match.winningTeam;
        let playingTeam = "";
        let matchResult = "";
        let kda = "";
        let playingChamp = "";
        let summonerScore = 0;
        let gameDuration = formatGameDuration(match.gameDuration);

        teamBlue.forEach(player => {
            if (player.puuid === summonerPuuid) {
                kda = player.kda;
                playingChamp = player.championName;
                playingTeam = "blue";
                summonerScore = player.totalScore;
                if (teamWin === 100) {
                    matchResult = "win";
                } else {
                    matchResult = "lose";
                }
            }
        });

        teamRed.forEach(player => {
            if (player.puuid === summonerPuuid) {
                kda = player.kda;
                playingChamp = player.championName;
                playingTeam = "red";
                summonerScore = player.totalScore;
                if (teamWin === 200) {
                    matchResult = "win";
                } else {
                    matchResult = "lose";
                }
            }
        });

        let blueTeamScore = 0;
        teamBlue.forEach(player => {
            blueTeamScore += player.totalScore;
            const playerCard = `
            <a href="/summoners/${region}/${player.riotGameName}/${player.riotTagLine}">
                <div class="playerCard" data-riotGameName="${player.riotGameName}" data-profileIcon="${player.profileIcon}" data-kda="${player.kda}" data-lane-dominance="${player.laneDominanceScore}" data-farming-efficiency="${player.farmingEfficiencyScore}" data-objective-contribution="${player.objectiveControlScore}" data-combat-effectiveness="${player.combatEffectivenessScore}" data-teamfight-contribution="${player.teamfightContributionScore}" data-vision-score="${player.visionControlScore}" data-total-score="${player.totalScore}">
                    <img src="http://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/champion/${player.championName}.png">
                    <small ${summonerPuuid === player.puuid ? `style="color: blue;"` : ``}>${player.riotGameName}</small>
                    <small ${summonerPuuid === player.puuid ? `style="color: blue;"` : ``}>${player.totalScore}</small>
                </div>
            </a>
            `
            teamBlueHTML += playerCard;
        });
        if (playingTeam === "blue") {
            blueTeamScore -= summonerScore;
            blueTeamScore = Math.round(blueTeamScore / (teamBlue.length - 1));
        } else {
            blueTeamScore = Math.round(blueTeamScore / teamBlue.length);
        }

        let redTeamScore = 0;
        teamRed.forEach(player => {
            redTeamScore += player.totalScore;
            const playerCard = `
            <a href="/summoners/${region}/${player.riotGameName}/${player.riotTagLine}">
                <div class="playerCard" data-riotGameName="${player.riotGameName}" data-profileIcon="${player.profileIcon}" data-kda="${player.kda}"  data-lane-dominance="${player.laneDominanceScore}" data-farming-efficiency="${player.farmingEfficiencyScore}" data-objective-contribution="${player.objectiveControlScore}" data-combat-effectiveness="${player.combatEffectivenessScore}" data-teamfight-contribution="${player.teamfightContributionScore}" data-vision-score="${player.visionControlScore}" data-total-score="${player.totalScore}">
                    <img src="http://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/champion/${player.championName}.png">
                    <small ${summonerPuuid === player.puuid ? `style="color: blue;"` : ``}>${player.riotGameName}</small>
                    <small ${summonerPuuid === player.puuid ? `style="color: blue;"` : ``}>${player.totalScore}</small>
                </div>
            </a>
            `
            teamRedHTML += playerCard;
        });
        if (playingTeam === "red") {
            redTeamScore -= summonerScore;
            redTeamScore = Math.round(redTeamScore / (teamRed.length - 1));
        } else {
            redTeamScore = Math.round(redTeamScore / teamRed.length);
        }

        const performanceRatio = summonerScore  / (playingTeam === "blue" ? blueTeamScore : redTeamScore);
        const rankPerformance = calculatePerformanceRank(performanceRatio, tier, rank);

        const matchContainer = `
        <div class="match-container ${matchResult}-match">
            <div class="${matchResult}-banner"></div>
            <div class="score-container">
                <p class="title-big">Score</p>
                <p class="score-big">${summonerScore}</p>
                <small>Game Length: ${gameDuration}</small>
            </div>
            <div>
                <img src="https://ddragon.leagueoflegends.com/cdn/${leagueVersion}/img/champion/${playingChamp}.png" class="playing-champ">
                <small>KDA ${kda}</small>
            </div>
            <div class="performance-rank" data-performance-rank="${rankPerformance.points}">
                <p class="title-big">Performance Rank</p>
                <img src="/assets/rank_${rankPerformance.tier.toLocaleLowerCase()}.png">
                <small style="color:${rankColors[rankPerformance.tier]}; font-size: 12px; font-weight: 500;">${rankPerformance.tier} ${rankPerformance.rank}</small>
            </div>
            <div class="ally-team-score">
                <p class="title-big">Teamates Average</p>
                <p class="score-big">${playingTeam === "blue" ? blueTeamScore : redTeamScore}</p>
            </div>
            <div class="ally-team-players">
                ${playingTeam === "blue" ? teamBlueHTML : teamRedHTML}
            </div>
            <div class="enemy-team-players">
                ${playingTeam !== "blue" ? teamBlueHTML : teamRedHTML}
            </div>
            <div class="enemy-team-score">
                <p class="title-big">Enemy Average</p>
                <p class="score-big">${playingTeam !== "blue" ? blueTeamScore : redTeamScore}</p>
            </div>
            <div class="${matchResult}-banner"></div>
        </div>
        `;

        document.getElementById('matches-container').innerHTML += matchContainer;
    });

    const players = document.querySelectorAll('.playerCard');
    const mainScores = document.querySelectorAll('.main-score');

    players.forEach(player => {
        showPopup(player);
    });
    mainScores.forEach(mainScore => {
        showPopup(mainScore);
    });
    const matchBoxes = document.querySelectorAll('.match-container');
    matchBoxes.forEach(matchBox => {
        const allyTeamScore = matchBox.querySelector('.ally-team-score .score-big');
        const enemyTeamScore = matchBox.querySelector('.enemy-team-score .score-big');
        const score = matchBox.querySelector('.score-container .score-big');
        const scoreValue = parseInt(score.innerText);
        const allyTeamScoreValue = parseInt(allyTeamScore.innerText);
        const enemyTeamScoreValue = parseInt(enemyTeamScore.innerText);
        if (allyTeamScoreValue > enemyTeamScoreValue) {
            allyTeamScore.style.color = '#5393CA';
            enemyTeamScore.style.color = '#ED6767';
        } else {
            allyTeamScore.style.color = '#ED6767';
            enemyTeamScore.style.color = '#5393CA';
        }
        if (scoreValue > allyTeamScoreValue) {
            score.style.color = '#5393CA';
        } else {
            score.style.color = '#ED6767';
        }
    });
}

function calculatePlayerOverallStats () {
    const matchBoxes = document.querySelectorAll('.match-container');
    let playerScoreDataArray = [];
    let teamScoreDataArray = [];
    let enemyScoreDataArray = [];
    let playerAverageScore = 0;
    let playerAverageRank = 0;
    matchBoxes.forEach(matchBox => {
        const personalScore = matchBox.querySelector('.score-container .score-big');
        const personalScoreValue = parseInt(personalScore.innerText);
        playerScoreDataArray.push(personalScoreValue);
        const allyTeamScore = matchBox.querySelector('.ally-team-score .score-big');
        const allyTeamScoreValue = parseInt(allyTeamScore.innerText);
        teamScoreDataArray.push(allyTeamScoreValue);
        const enemyTeamScore = matchBox.querySelector('.enemy-team-score .score-big');
        const enemyTeamScoreValue = parseInt(enemyTeamScore.innerText);
        enemyScoreDataArray.push(enemyTeamScoreValue);
        if (personalScoreValue > allyTeamScoreValue) {
            personalScore.style.color = '#5393CA';
        } else {
            personalScore.style.color = '#ED6767';
        }
        playerAverageScore += personalScoreValue;
        
        const playerRank = matchBox.querySelector('.performance-rank').getAttribute('data-performance-rank');
        const playerRankValue = parseInt(playerRank);
        playerAverageRank += playerRankValue;
    });
    generatePerformanceChart(playerScoreDataArray, teamScoreDataArray, enemyScoreDataArray);
    playerAverageScore = Math.round(playerAverageScore / matchBoxes.length);
    playerAverageRank = Math.round(playerAverageRank / matchBoxes.length);
    // document.getElementById('player-average-score').innerText = playerAverageScore;
    const playerRealRank = ranks.find(rank => rank.points >= playerAverageRank);
    const newPlayerRealRank = ranks[ranks.indexOf(playerRealRank) - 1];
    document.querySelector('#performance-rank img').src = `/assets/rank_${newPlayerRealRank.tier.toLocaleLowerCase()}.png`;
    const performanceRank = document.querySelector('#performance-rank p');
    performanceRank.innerText = `${newPlayerRealRank.tier} ${newPlayerRealRank.rank}`;
    performanceRank.style.color = rankColors[newPlayerRealRank.tier];

    document.getElementById('player-average-score').innerText = playerAverageScore;
    let teamAverageScore = Math.round(teamScoreDataArray.reduce((a, b) => a + b, 0) / teamScoreDataArray.length);
    let enemyAverageScore = Math.round(enemyScoreDataArray.reduce((a, b) => a + b, 0) / enemyScoreDataArray.length);
    document.getElementById('team-average-score').innerText = teamAverageScore;
    document.getElementById('enemy-average-score').innerText = enemyAverageScore;

    if (playerAverageScore > teamAverageScore) {
        document.getElementById('player-average-score').style.color = '#5393CA';
    } else {
        document.getElementById('player-average-score').style.color = '#ED6767';
    }

    if (teamAverageScore > enemyAverageScore) {
        document.getElementById('team-average-score').style.color = '#5393CA';
        document.getElementById('enemy-average-score').style.color = '#ED6767';
    } else {
        document.getElementById('team-average-score').style.color = '#ED6767';
        document.getElementById('enemy-average-score').style.color = '#5393CA';
    }

    if (playerAverageScore > 2500) {
        playerAverageScore = 2500;
    }

    if (teamAverageScore > 2500) {
        teamAverageScore = 2500;
    }

    if (enemyAverageScore > 2500) {
        enemyAverageScore = 2500;
    }

    doughnutCart('player-average-score-chart', [playerAverageScore, 2500 - playerAverageScore]);
    doughnutCart('team-average-score-chart', [teamAverageScore, 2500 - teamAverageScore]);
    doughnutCart('enemy-average-score-chart', [enemyAverageScore, 2500 - enemyAverageScore]);

}

function calculateAccountHealth () {
    const matchBoxes = document.querySelectorAll('.match-container');

    let accountHealth = 0;

    matchBoxes.forEach(matchBox => {
        const allyTeamScore = matchBox.querySelector('.ally-team-score .score-big');
        const enemyTeamScore = matchBox.querySelector('.enemy-team-score .score-big');
        const allyTeamScoreValue = parseInt(allyTeamScore.innerText);
        const enemyTeamScoreValue = parseInt(enemyTeamScore.innerText);
        if (allyTeamScoreValue > enemyTeamScoreValue) {
            accountHealth += 1;
        }
    });
    let total = Math.round(accountHealth / matchBoxes.length * 100);

    document.getElementById('result-text').innerText = `Account Health ${total}%`;
    document.getElementById('percentage-bar').style.width = `${total}%`;

    if (total >= 0 && total < 20) {
        document.getElementById('percentage-bar').style.backgroundColor = 'red';
        document.getElementById('result-info').innerText = 'In most of your games your team is weaker than enemy teams.';
    } else if (total >= 20 && total < 40) {
        document.getElementById('percentage-bar').style.backgroundColor = 'orange';
        document.getElementById('result-info').innerText = 'In most of your games your team is weaker than enemy teams.';
    } else if (total >= 40 && total < 60) {
        document.getElementById('percentage-bar').style.backgroundColor = 'yellow';
        document.getElementById('result-info').innerText = 'Half of the time your team is weaker than enemy teams.';
    } else if (total >= 60 && total < 80) {
        document.getElementById('percentage-bar').style.backgroundColor = 'lightgreen';
        document.getElementById('result-info').innerText = 'You are mostly in the winners team.';
    } else if (total >= 80 && total <= 100) {
        document.getElementById('percentage-bar').style.backgroundColor = 'green';
        document.getElementById('result-info').innerText = 'You get the winners team nearly all the time.';
    } else {
        document.getElementById('percentage-bar').style.backgroundColor = 'green';
        document.getElementById('result-info').innerText = 'You are winning most of your games.';
    }
}

const ranks = [
    { tier: 'IRON', rank: 'IV', points: 0},
    { tier: 'IRON', rank: 'III', points: 500},
    { tier: 'IRON', rank: 'II', points: 1000},
    { tier: 'IRON', rank: 'I', points: 1500},
    { tier: 'BRONZE', rank: 'IV', points: 2000},
    { tier: 'BRONZE', rank: 'III', points: 2500},
    { tier: 'BRONZE', rank: 'II', points: 3000},
    { tier: 'BRONZE', rank: 'I', points: 3500},
    { tier: 'SILVER', rank: 'IV', points: 4000},
    { tier: 'SILVER', rank: 'III', points: 4500},
    { tier: 'SILVER', rank: 'II', points: 5000},
    { tier: 'SILVER', rank: 'I', points: 5500},
    { tier: 'GOLD', rank: 'IV', points: 6000},
    { tier: 'GOLD', rank: 'III', points: 6500},
    { tier: 'GOLD', rank: 'II', points: 7000},
    { tier: 'GOLD', rank: 'I', points: 7500},
    { tier: 'PLATINUM', rank: 'IV', points: 8000},
    { tier: 'PLATINUM', rank: 'III', points: 8500},
    { tier: 'PLATINUM', rank: 'II', points: 9000},
    { tier: 'PLATINUM', rank: 'I', points: 9500},
    { tier: 'EMERALD', rank: 'IV', points: 10000},
    { tier: 'EMERALD', rank: 'III', points: 10500},
    { tier: 'EMERALD', rank: 'II', points: 11000},
    { tier: 'EMERALD', rank: 'I', points: 11500},
    { tier: 'DIAMOND', rank: 'IV', points: 12000},
    { tier: 'DIAMOND', rank: 'III', points: 12500},
    { tier: 'DIAMOND', rank: 'II', points: 13000},
    { tier: 'DIAMOND', rank: 'I', points: 13500},
    { tier: 'MASTER', rank: 'I', points: 14000},
    { tier: 'GRANDMASTER', rank: 'I', points: 15000},
    { tier: 'CHALLENGER', rank: 'I', points: 16000}
]

function calculatePerformanceRank(performanceRatio, tier, rank) {
    const currentRankIndex = ranks.findIndex(r => r.tier === tier && r.rank === rank);
    const pointChange = Math.round((performanceRatio) * 4000);
    const totalPointChange = pointChange - 4000;
    const currentPoints = ranks[currentRankIndex].points;
    const newPoints = currentPoints + totalPointChange;
    if (newPoints <= 0) {
        return {
            tier: 'IRON',
            rank: 'IV',
            points: 0
        }
    }
    if (newPoints >= 16000) {
        return {
            tier: 'CHALLENGER',
            rank: 'I',
            points: 16000
        }
    }
    const newRankIndex = ranks.findIndex(r => r.points >= newPoints);
    const newRank = ranks[newRankIndex - 1];
    console.log(newPoints, newRank);
    return {
        tier: newRank.tier,
        rank: newRank.rank,
        points: newPoints
    }
}

function generatePerformanceChart (playerScoreDataArray, teamScoreDataArray, enemyScoreDataArray) {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    let allLabels = [];
    let counter = 0;
    for (let i = 0; i < playerScoreDataArray.length; i++) {
        allLabels.push(counter.toString());
        counter++;
    }
    let min = Math.min(...playerScoreDataArray, ...teamScoreDataArray, ...enemyScoreDataArray);
    min = min - 150;
    let max = Math.max(...playerScoreDataArray, ...teamScoreDataArray, ...enemyScoreDataArray);
    max = max + 150;
    // reverse the arrays to show the latest games first
    playerScoreDataArray.reverse();
    teamScoreDataArray.reverse();
    enemyScoreDataArray.reverse();

    const data = {
        labels: allLabels,
        datasets: [
            {
                label: 'Your Score',
                data: playerScoreDataArray,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0,
                pointRadius: 2,
                pointHoverRadius: 8,
                borderWidth: 2,
                order: 1
            },
            {
                label: 'Team',
                data: teamScoreDataArray,
                borderColor: 'rgba(54, 162, 235, 0.8)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                fill: true,
                tension: 0,
                pointRadius: 1,
                pointHoverRadius: 7,
                borderWidth: 1,
                order: 2
            },
            {
                label: 'Enemy',
                data: enemyScoreDataArray,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                fill: true,
                tension: 0,
                pointRadius: 1,
                pointHoverRadius: 7,
                borderWidth: 1,
                order: 3
            },
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 10,
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                        color: '#666'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false,
                        drawTicks: false
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                        font: {
                            size: 12
                        },
                        color: 'rgba(0, 0, 0, 0.7)'
                    },
                    title: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0)',
                        drawBorder: false
                    },
                    title: {
                        display: false
                    },
                    min: Math.floor(min / 100) * 100,
                    max:  Math.ceil(max / 100) * 100,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        },
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 1
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    };
    
    const myChart = new Chart(ctx, config);
}


function doughnutCart(id, data) {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [data[0], data[1]],
            backgroundColor: ['#5393CA', '#ED6767']
          }]
        },
        options: {
          cutout: '60%',
          plugins: { legend: { display: false } }
        }
    });
}