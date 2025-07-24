const mongoose = require('mongoose');

/**
 * function to set the model type of the collection
 * */
const clubGameSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        required: true,
        index: true
    },
    club_id:{
        type: Number,
        required: true,
        index: true
    },
    own_goals: Number,
    own_manager_name: String,
    opponent_id: {
        type: Number,
        required: true,
        index: true
    },
    opponent_goals: Number,
    opponent_manager_name: String,
    hosting: {
        type: String,
        enum: ['Home', 'Away'],
        required: true
    },
    is_win: {
        type: Number,
        enum: [0, 1],
        required: true
    }
});

module.exports = mongoose.model('ClubGame', clubGameSchema, 'club_games');