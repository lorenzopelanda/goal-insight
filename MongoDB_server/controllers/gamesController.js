const Game = require('../models/gamesModel');
const { exec } = require('child_process');

/**
 * function to import the data from the csv file to the database
 * @returns {JSON} - JSON object with all the data
 * @throws {500} - if there's an error during the import
 */
exports.importDataFromCsv = (req, res) => {
    const dbName = 'football';
    const collectionName = 'games';
    const filePath = '/home/lorenzo/Documents/3-TERZO-ANNO/IUMTWEB/Manipulated_data/games.csv';


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
 * function to get a game from its club id
 * @returns {JSON} - JSON object with all the games played from the club
 * @throws {404} - if no games are found
 * @throws {500} - if the format of the id is not correct
 */
function getGamesByClubId(club_id) {
    return new Promise((resolve, reject) => {
        Game.find({
            $or: [
                {home_club_id: club_id},
                {away_club_id: club_id}
            ]
        }, {_id: 0, round: 0, home_club_manager_name: 0, away_club_manager_name: 0,competition_type:0})
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            });
    })
};
module.exports.getGamesByClubId = getGamesByClubId;

/**
 * function to get the most important information about a game from its id
 * @returns {JSON} - JSON object with the details of the game
 * @throws {404} - if the game is not found
 * @throws {500} - if the format of the id is not correct
 */
function getGameDetails(game_id) {
    return new Promise((resolve, reject) => {
        Game.findOne({game_id: game_id}, {
            _id: 0,
            round: 0,
            home_club_manager_name: 0,
            away_club_manager_name: 0,
            home_club_goals: 0,
            away_club_goals: 0,
            competition_type: 0
        })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    })
};
module.exports.getGameDetails = getGameDetails;
