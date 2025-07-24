const clubGame = require('../models/club_gamesModel.js');
const { exec } = require('child_process');

/**
 * function to import the data from the csv file to the database
 * @returns {JSON} - JSON object with all the data
 * @throws {500} - if there's an error during the import
 */
exports.importDataFromCsv = (req, res) => {
    const dbName = 'football';
    const collectionName = 'club_games';
    const filePath = '/home/lorenzo/Documents/3-TERZO-ANNO/IUMTWEB/Manipulated_data/club_games.csv';


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
 * function to get all the games played by a club from the database
 * @returns {JSON} - JSON object with all the games played by a club
 * @throws {404} - if there's no games played
 */
function getClubGamesByID(club_id) {
    return new Promise((resolve,reject)=>{
        clubGame.find({ $or: [{club_id: club_id},{opponent_id: club_id}]},{own_manager_name:0,opponent_manager_name:0,_id:0})
            .then(results=>{
                resolve(results);
            })
            .catch(error=>{
                reject(error);
            });
    })
}

module.exports.getClubGamesByID=getClubGamesByID;
/**
 * function to get the most popular clubs based on the number of games played
 * @returns {JSON} - JSON object with most popular clubs
 * @throws {404} - if there are no clubs
 * @throws {500} - if there's an error during the search
 */
function getMostAppearedClubsByFrequency (){
    return new Promise((resolve,reject)=> {
        clubGame.aggregate([
            {
                $facet: {
                    byClubId: [
                        {
                            $group: {
                                _id: '$club_id',
                                frequency: { $sum: 1 },
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                frequency: 1
                            }
                        }
                    ],
                    byOpponentId: [
                        {
                            $group: {
                                _id: '$opponent_id',
                                frequency: { $sum: 1 }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                frequency: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    allClubs: { $concatArrays: ["$byClubId", "$byOpponentId"] }
                }
            },
            {
                $unwind: "$allClubs"
            },
            {
                $group: {
                    _id: "$allClubs._id",
                    totalFrequency: { $sum: "$allClubs.frequency" }
                }
            },
            {
                $sort: { totalFrequency: -1, _id: 1 }
            },
            {
                $group: {
                    _id: "$totalFrequency",
                    club_id: { $first: "$_id" },
                    totalFrequency: { $first: "$totalFrequency" }
                }
            },
            {
                $sort: { totalFrequency: -1 }
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0,
                    club_id: 1,
                    totalFrequency: 1
                }
            }
        ]).allowDiskUse(true)
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    })
};

module.exports.getMostAppearedClubsByFrequency=getMostAppearedClubsByFrequency;

