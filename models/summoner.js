const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
    summonerId: { type: String, required: true },
    summonerName: { type: String, required: true },
    summonerLevel: { type: Number, required: true },
    profileIconId: { type: Number, required: true },
    tag: { type: String, required: true },
    region: { type: String, required: true },
    liveGame: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'LiveGames'
    }
});

module.exports = mongoose.model('Summoner', summonerSchema);