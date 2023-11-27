document.getElementById('search-summoner').addEventListener('submit', async function(e) {
    e.preventDefault();
    const summoner = document.getElementById('summonerName').value.replace(/\s/g, "%20");
    const region = document.getElementById('serverSelect').value;
    window.location.href = `/live/${region}/${summoner}`
});