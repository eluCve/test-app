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

document.getElementById('openBtn').addEventListener('click', function() {
    var modal = document.getElementById('videoModal');
    var iframe = document.getElementById('youtubeVideo');
    iframe.src = "https://player.vimeo.com/video/937028581"; // Replace VIDEO_ID with your video's ID
    modal.style.display = "block";
    setTimeout(() => {
        modal.children[0].classList.add('show');
    }, 10); // Adding a delay to trigger the animation
});

window.onclick = function(event) {
    var modal = document.getElementById('videoModal');
    if (event.target == modal) {
        var iframe = document.getElementById('youtubeVideo');
        iframe.src = ""; // Stop video when closing
        modal.children[0].classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 500); // Delay to allow animation to play
    }
}