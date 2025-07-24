const mongoose = require('mongoose');

/**
 * function to set the model type of the collection
 * */
const gamesSchema = new mongoose.Schema({
    game_id : {
        type: Number,
        index: true
    },
    competition_id: String,
    season: Number,
    round: String,
    date: Date,
    home_club_id: {
        type: Number,
        index: true
    },
    away_club_id: {
        type: Number,
        index: true
    },
    home_club_goals: Number,
    away_club_goals: Number,
    home_club_manager_name: String,
    away_club_manager_name: String,
    stadium: String,
    referee: String,
    home_club_name: String,
    away_club_name: String,
    aggregate: String,
    competition_type: String,
});

module.exports = mongoose.model('games', gamesSchema);