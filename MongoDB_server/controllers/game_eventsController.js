const GameEvents = require('../models/game_eventsModel.js');
const {exec} = require('child_process');

/**
 * function to import the data from the csv file to the database
 * @returns {JSON} - JSON object with all the data
 * @throws {500} - if there's an error during the import
 */
exports.importDataFromCsv = (req, res) => {
    const dbName = 'football';
    const collectionName = 'game_events';
    const filePath = '/home/lorenzo/Documents/3-TERZO-ANNO/IUMTWEB/Manipulated_data/game_events.csv';


    const command = `mongoimport --db ${dbName} --collection ${collectionName} --type csv --file ${filePath} --headerline`;


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing mongoimport: ${error}`);
            return res.status(500).json({ error: 'Error collecting the data' });
        }


        console.log(`Mongoimport output: ${stdout}`);
        console.error(`Errors of mongoimport: ${stderr}`);


        res.json({ message: 'Successfully collected data!' });
    });
};

/**
 * function to get all the events of a game from the database by the game id
 * @returns {JSON} - JSON object with all the events of the game
 * @throws {404} - if there are no events of the game
 */
function getGameEventsByGameId(game_id) {
    return new Promise((resolve, reject) => {
        GameEvents.find({game_id: game_id}, {_id: 0})
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            });
    })
}
module.exports.getGameEventsByGameId = getGameEventsByGameId;

/**
 * function to get all the events of the games from the database of the player id
 * @returns {JSON} - JSON object with all the events of the game
 * @throws {404} - if there are no events of the game
 */
function getGameEventsByPlayerId(player_id) {
    return new Promise((resolve, reject) => {
        GameEvents.find({player_id: player_id}, {_id: 0})
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            });
    })
}
module.exports.getGameEventsByPlayerId = getGameEventsByPlayerId;