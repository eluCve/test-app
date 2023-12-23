const mongoose = require('mongoose');

const liveGameSchema = new mongoose.Schema({
    gameId: { type: Number, required: true,},
    region: { type: String, required: true },
    red_team: [{ type: String, required: true }],
    blue_team: [{ type: String, required: true }],
    team_color: { type: String, required: true },
    enemy_color: { type: String, required: true },
    jungler_blue: { type: String, required: false },
    jungler_red: { type: String, required: false },
    blue_team_power: [{ type: Number, required: false }],
    red_team_power: [{ type: Number, required: false }],
    analysis: String,
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model('LiveGame', liveGameSchema);