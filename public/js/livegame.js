document.getElementById('summoner-name').innerHTML = summonerName;
document.getElementById('region').innerHTML = region;
const searchGameInterval = setInterval(checkAndAnalyzeGame, 5000);

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function showTeams(data) {
    ['red', 'blue'].forEach(team => {
      const teamData = data[`${team}_team`];
      const container = document.querySelector(`#team-${team}-banners`);
      container.innerHTML = ''; // Clear existing images
  
      teamData.forEach(champion => {
        // Create an img element
        const img = document.createElement('img');
        img.className = 'champion-banner';
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion}_0.jpg`;
  
        // Create a container for the image
        const div = document.createElement('div');
        div.className = 'champion-container'; // Add any necessary classes
        div.appendChild(img);
  
        // Append the container with the image to the main container
        container.appendChild(div);
      });
    });
  }

async function checkAndAnalyzeGame() {
  try {
    const liveGame = await fetchJson(`/search-game/${region}/${summonerId}`);
    if (liveGame.status === 404) {
      clearInterval(searchGameInterval);
      console.log(liveGame)
      return;
    }
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    showTeams(liveGame);
    clearInterval(searchGameInterval);
    const analysis = await fetchJson('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ red_team: liveGame.red_team, blue_team: liveGame.blue_team, teamColor: liveGame.teamColor, enemyTeamColor: liveGame.enemyTeamColor, junglerBlue: liveGame.junglerBlue, junglerRed: liveGame.junglerRed })
    });
    console.log(analysis);
    const redTeamContainer = document.getElementById('team-red-banners');
    const blueTeamContainer = document.getElementById('team-blue-banners');
    redTeamContainer.innerHTML = '';
    blueTeamContainer.innerHTML = '';
    Object.entries(analysis.red.lanes).forEach(([lane, champion]) => {
        let img = document.createElement('img');
        let div = document.createElement('div');
        img.className = 'champion-banner';
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion}_0.jpg`;
        div.className = 'champion-container';
        div.appendChild(img);
        redTeamContainer.appendChild(div);
    })
    Object.entries(analysis.blue.lanes).forEach(([lane, champion]) => {
        let img = document.createElement('img');
        let div = document.createElement('div');
        img.className = 'champion-banner';
        img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${champion}_0.jpg`;
        div.className = 'champion-container';
        div.appendChild(img);
        blueTeamContainer.appendChild(div);
    })
    typewriterEffect('red-comp', analysis.red.composition, 50);
    typewriterEffect('blue-comp', analysis.blue.composition, 50);
    typewriterEffect('general', analysis[liveGame.teamColor].strategy.general, 50);
    typewriterEffect('objectives', analysis[liveGame.teamColor].strategy.objectives, 50);
    typewriterEffect('teamfights', analysis[liveGame.teamColor].strategy.teamfights.winningScenario, 50);
    typewriterEffect('avoid', analysis[liveGame.teamColor].strategy.teamfights.losingScenario, 50);
    typewriterEffect('warnings', analysis[liveGame.teamColor].strategy.warnings, 50);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

function typewriterEffect(elementId, text, speed) {
  let index = 0;
  let element = document.getElementById(elementId);
  let characters = text.split(' ');
  let interval = setInterval(function() {
      element.innerText += " "+ characters[index];
      index++;
      if (index === characters.length) {
          clearInterval(interval);
      }
  }, speed);
}

document.getElementById('btn-share').addEventListener('click', () => {
  let buttonText = document.getElementById('btn-share-text');
  navigator.clipboard.writeText(window.location.href).then(function() {
    buttonText.innerText = 'COPIED';
    setTimeout(function() {
      buttonText.innerText = 'SHARE';
    }, 2000);
  }).catch(function(error) {
      console.error('Error copying text: ', error);
  });
})

document.getElementById('btn-reload').addEventListener('click', () => {
  window.location.reload();
})