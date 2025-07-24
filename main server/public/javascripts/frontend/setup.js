// Global variables to keep track of the current and previous views
window.currentView = "homepage";
window.previousView = "";
import {setup} from "./homepage.js";
import {players} from "./players.js";
import {playerDetails} from "./playerDetails.js";
import {clubs} from "./clubs.js";
import {clubDetails} from "./clubDetails.js";
import {competitions} from "./competitions.js";
import {competitionDetails} from "./competitionDetails.js";
import {matchDetails} from "./matchDetails.js";


setup();
// Switch statement to handle different views
switch (window.currentView) {
    case "players":
        players();
        break;
    case "playerDetails":
        playerDetails();
        break;
    case "clubs":
        clubs();
        break;
    case "clubDetails":
        clubDetails();
        break;
    case "competitions":
        competitions();
        break;
    case "competitionDetails":
        competitionDetails();
        break;
    case "matchDetails":
        matchDetails();
        break;
}
