const mongoose = require('mongoose');

/**
 * function to set the model type of the collection
 * */
const game_eventsSchema = new mongoose.Schema({
    date: Date,
    game_id: {
        type: Number,
        required: true,
        index: true
    },
    minute: Number,
    type: String,
    club_id:{
        type: Number,
        required: true,
        index: true
    },
    player_id: {
        type: Number,
        required:true,
        index: true
    },
    description: String,
    name:{
        type: String,
        required: true

    }

});

module.exports = mongoose.model('GameEvents', game_eventsSchema, 'game_events');