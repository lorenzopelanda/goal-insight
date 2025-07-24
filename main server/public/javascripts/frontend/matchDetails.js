/**
 * The matchDetails function is responsible for managing the match details page.
 * It includes functions to show different pages and get match details.
 * It also includes event listeners for logo, competitions, clubs, and players.
 * The function uses axios to make HTTP requests to the server.
 * @param {string} gameId - The ID of the game to display.
 * @param {string} homeClubName - The name of the home club.
 * @param {string} homeClubId - The ID of the home club.
 * @param {string} awayClubName - The name of the away club.
 * @param {string} awayClubId - The ID of the away club.
 * @param {string} aggregate - The aggregate score of the match.
 * @param {string} referee - The name of the referee.
 * @param {string} date - The date of the match.
 * @param {string} stadium - The name of the stadium.
 */
export function matchDetails(gameId, homeClubName, homeClubId, awayClubName, awayClubId, aggregate, referee, date, stadium) {

    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage' and hides the match details page.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let matchDetails = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions' and hides the match details page.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let matchDetailsPage = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetailsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs' and hides the match details page.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let matchDetails = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players' and hides the match details page.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let matchDetails = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./players.js")
            .then(module => {
                module.players();
            });
    }

    /**
     * The showClubDetailsPage function is responsible for displaying a specific club's page.
     * It changes the current view to 'clubDetails' and hides the match details page.
     * @param {string} clubId - The ID of the club to display.
     */
    let showClubDetailsPage = (clubId) => {
        let clubDetailsPage = document.getElementsByClassName("clubDetailsPage")[0];
        window.currentView = "clubDetails";
        clubDetailsPage.classList.remove("hide");
        let matchDetails = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubDetails.js")
            .then(module => {
                module.clubDetails(clubId);
            });
    }

    /**
     * The showPlayerDetailsPage function is responsible for displaying a specific player's page.
     * It changes the current view to 'playerDetails' and hides the match details page.
     * @param {string} playerId - The ID of the player to display.
     */
    let showPlayerDetailsPage = (playerId) => {
        let playerPage = document.getElementsByClassName("playerDetailsPage")[0];
        window.currentView = "playerDetails";
        playerPage.classList.remove("hide");
        let matchDetails = document.getElementsByClassName("matchDetailsPage")[0];
        matchDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./playerDetails.js")
            .then(module => {
                module.playerDetails(playerId);
            });
    }

    // Code to get match details and display them
    if (window.currentView === "matchDetails") {
        let homeClub = document.getElementsByClassName("club-results1")[0];
        let awayClub = document.getElementsByClassName("club-results2")[0];
        let goalsMade = document.getElementsByClassName("goals-made")[0];
        let matchInfos = document.getElementsByClassName("list-unstyled-matchDeatils")[0];
        axios.get(`http://localhost:3001/game_events-bygameid?game_id=${gameId}`)
            .then(response => {
                let gameEvents = response.data;
                homeClub.innerHTML = "";
                awayClub.innerHTML = "";
                goalsMade.innerHTML = "";
                matchInfos.innerHTML = "";
                homeClub.addEventListener("click", () => {
                    showClubDetailsPage(homeClubId);
                });
                awayClub.addEventListener("click", () => {
                    showClubDetailsPage(awayClubId);
                });
                homeClub.innerHTML += `<span>${homeClubName}</span>`;
                awayClub.innerHTML += `<span>${awayClubName}</span>`;
                goalsMade.innerHTML += `<span>${aggregate.split('').join(' ')}</span>`;
                matchInfos.innerHTML += `<li class="info-element">Date: &nbsp;<span>${date}</span></li>
                                     <li class="info-element">Referee: &nbsp;<span>${referee}</span></li>
                                     <li class="info-element">Stadium: &nbsp;<span>${stadium}</span></li>`;
                let homeClubStory = document.getElementById("club1-list-unstyled");
                let awayClubStory = document.getElementById("club2-list-unstyled");
                homeClubStory.innerHTML = "";
                awayClubStory.innerHTML = "";
                gameEvents.sort((a, b) => a.minute - b.minute);

                gameEvents.forEach(result => {
                    let li = document.createElement("li");
                    let imgSrc = "";

                    if (result.type === "Goals") {
                        imgSrc = "images/pages/match_page/goal.png";
                    } else if (result.type === "Substitutions") {
                        imgSrc = "images/pages/match_page/substitution.svg";
                    } else if (result.type === "Cards") {
                        if (result.description.includes("Yellow card")) {
                            imgSrc = "images/pages/match_page/yellow_card.png";
                        } else if (result.description.includes("Red card")) {
                            imgSrc = "images/pages/match_page/red_card.png";
                        }
                    }
                        if (imgSrc) {
                            li.innerHTML = `${result.minute}' &nbsp;-&nbsp;&nbsp;<img class="match-icon" src="${imgSrc}">${result.name}`;
                            if (result.club_id === homeClubId) {
                                homeClubStory.appendChild(li);
                            } else if (result.club_id === awayClubId) {
                                awayClubStory.appendChild(li);
                            }
                            axios.get(`http://localhost:8081/player/getPlayerIdsAndNames`)
                                .then(response => {
                                    response.data.forEach(player => {
                                        if(player.player_id === result.player_id){
                                            li.classList.add('hoverable');
                                            li.addEventListener("click", () => {
                                                showPlayerDetailsPage(result.player_id);
                                            });

                                        }
                                    })


                                })
                                .catch(error => console.error('Error:', error));

                        }
                });

            })
                    .catch(error => console.error('Error:', error));

        // Event listeners for logo, competitions, clubs, and players
        let logo = document.getElementById("logo-logo");
        if (logo) {
            logo.addEventListener("click", showHomePage);
        }

        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);

        let clubsPageButton = document.getElementById("club-navbar");
        clubsPageButton.addEventListener("click", showClubsPage);

        let players = document.getElementById("player-navbar");
        players.addEventListener("click", showPlayersPage);
    }

}