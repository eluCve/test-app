document.getElementById('search-summoner').addEventListener('submit', async function(e) {
    e.preventDefault();
    const summoner = document.getElementById('summonerName').value.replace(/\s/g, "%20");
    const region = document.getElementById('serverSelect').value;
    const tag = document.getElementById('tag').value;
    const trimmedsummoner = summoner.trim();
    const trimmedTag = tag.trim();
    const cleanedTag = trimmedTag.startsWith('#') ? trimmedTag.slice(1) : trimmedTag;
    window.location.href = `/summoner/${region}/${trimmedsummoner}/${cleanedTag}`;
});