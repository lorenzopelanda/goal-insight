const mongoose = require('mongoose');

/**
 * function to set the model type of the collection
 * */
const appearanceSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        index: true
    },
    player_club_id: Number,
    player_current_club_id: Number,
    date: Date,
    player_name: String,
    competition_id: String,
    yellow_cards: Number,
    red_cards: Number,
    goals: Number,
    assists: Number,
    minutes_played: Number

});

module.exports = mongoose.model('Appearance', appearanceSchema);