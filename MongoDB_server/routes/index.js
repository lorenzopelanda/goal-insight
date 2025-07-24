var express = require('express');
var router = express.Router();

const gameController = require('../controllers/gamesController');
const club_gamesController = require('../controllers/club_gamesController');
const appearancesController = require('../controllers/appearancesController');
const game_eventsController = require('../controllers/game_eventsController');
const bodyparser = require("body-parser");

router.use(bodyparser.json());
/**
 * functions to import the data from the csv files into the database
 * */
router.post('/import-games',gameController.importDataFromCsv);
router.post('/import-clubgames',club_gamesController.importDataFromCsv);
router.post('/import-appearances',appearancesController.importDataFromCsv);
router.post('/import-gameevents',game_eventsController.importDataFromCsv);

/**
 * getter functions for club_games collection
 * */
router.get('/clubgame-byid',async(req,res)=>{
    try{
        console.log(req.body);
        const results = await club_gamesController.getClubGamesByID(req.query.club_id);
        res.json(results);

    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

router.get('/clubgame-mostappearedclubs',async(req,res)=>{
    try{
        const results = await club_gamesController.getMostAppearedClubsByFrequency();
        res.json(results);
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

/**
 * getter functions for games collection
 * */
router.get('/games-byclubid',async(req,res)=>{
    try{
        const results = await gameController.getGamesByClubId(req.query.club_id);
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

router.get('/games-detailsbyid',async(req,res)=>{
    try{
        const results = await gameController.getGameDetails(req.query.game_id);
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

/**
 * getter functions for appearances collection
 * */
router.get('/appearances-byplayerid',async(req,res)=>{
    try{
        const results = await appearancesController.getAppearancesByPlayerId(req.query.player_id);
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});
router.get('/appearances-mostappearedplayers',async(req,res)=>{
    try{
        const results = await appearancesController.getMostAppearedPlayersByAppearances();
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

/**
 * getter functions for game_events collection
 */
router.get('/game_events-bygameid',async(req,res)=>{
    try{
        const results = await game_eventsController.getGameEventsByGameId(req.query.game_id);
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
});

router.get('/game_events-byplayerid',async(req,res)=>{
    try{
        const results = await game_eventsController.getGameEventsByPlayerId(req.query.player_id);
        res.json(results)
    }
    catch (err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
});
module.exports = router;
