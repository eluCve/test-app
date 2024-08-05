const mongoose = require('mongoose');


const playerSchema =  new mongoose.Schema({
    puuid: { type: String, required: true },
    riotGameName: { type: String, required: true },
    riotTagLine: { type: String, required: true },
    summonerName: { type: String, required: true },
    profileIcon: { type: Number, required: true },
    championName: { type: String, required: true },
    individualPosition: { type: String, required: true },
    kda: { type: String, required: true },
    laneDominanceScore: { type: Number, required: true },
    farmingEfficiencyScore: { type: Number, required: true },
    objectiveControlScore: { type: Number, required: true },
    combatEffectivenessScore: { type: Number, required: true },
    teamfightContributionScore: { type: Number, required: true },
    visionControlScore: { type: Number, required: true },
    totalScore: { type: Number, required: true }
});

const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true, uique: true, index: true },
    gameCreation: { type: Number, required: true },
    gameDuration: { type: Number, required: true },
    blueTeam: [playerSchema],
    redTeam: [playerSchema],
    winningTeam: { type: Number, required: true },
});

module.exports = mongoose.model('matches', matchSchema);