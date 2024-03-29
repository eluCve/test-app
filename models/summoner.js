const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
    summonerId: { type: String, required: true },
    summonerName: { type: String, required: true },
    summonerLevel: { type: Number, required: true },
    profileIconId: { type: Number, required: true },
    tag: { type: String, required: true },
    region: { type: String, required: true },
    liveGame: { 
        gameId: { type: String, required: false },
        red_team: { type: Array, required: false },
        blue_team: { type: Array, required: false },
        team_color: { type: String, required: false },
        enemy_color: { type: String, required: false },
        jungler_red: { type: String, required: false },
        jungler_blue: { type: String, required: false },
        blue_team_power: { type: Array, required: false },
        red_team_power: { type: Array, required: false },
        playingChamp: { type: String, required: false },
        teamsPower: { type: String, required: false },
        items: { type: String, required: false },
        analysis: { type: String, required: false },
    }
});

module.exports = mongoose.model('Summoner', summonerSchema);