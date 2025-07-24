const Appearance = require('../models/appearancesModel');
const { exec } = require('child_process');

/**
 * function to import the data from the csv file to the database
 * @returns {JSON} - JSON object with all the data
 * @throws {500} - if there's an error during the import
 */
exports.importDataFromCsv = (req, res) => {
    const dbName = 'football';
    const collectionName = 'appearances';
    const filePath = '/home/lorenzo/Documents/3-TERZO-ANNO/IUMTWEB/Manipulated_data/appearances.csv';


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
 * function to get all the appearances of a player from the database
 * @returns {JSON} - JSON object with all the appearances of the player
 * @throws {404} - if there are no appearances of the player
 * @throws {500} - if the format of the id is not correct
 */
function getAppearancesByPlayerId(player_id) {
    return new Promise((resolve,reject)=>{
    Appearance.find({ player_id: player_id },{_id:0,appearance_id:0})
        .then(results=>{
            resolve(results);
        })

        .catch (err=>{
            reject(err);

        });
    })
}
module.exports.getAppearancesByPlayerId=getAppearancesByPlayerId;

/**
 * function to get the most popular 10 players by appearances
 * @returns {JSON} - JSON object with the most popular 10 players by appearances
 * @throws {404} - if there are no players
 * @throws {500} - if there's an error during the search
 * */
function getMostAppearedPlayersByAppearances() {
    return new Promise((resolve, reject) => {
        Appearance.aggregate([
            {
                $group: {
                    _id: '$player_id',
                    totalAppearances: {$sum: 1},
                    player_name: {$first: '$player_name'}
                }
            },
            {
                $sort: {totalAppearances: -1, player_name: 1}
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0,
                    player_id: "$_id",
                    totalAppearances: 1,
                    player_name: 1
                }
            }
        ]).allowDiskUse(true)
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            })
    });
}

module.exports.getMostAppearedPlayersByAppearances = getMostAppearedPlayersByAppearances;
