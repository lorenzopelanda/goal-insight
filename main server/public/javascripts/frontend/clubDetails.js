/**
 * The clubDetails function is responsible for managing the club details page.
 * It includes functions to show different pages, display club details, and get club details.
 * It also includes event listeners for navigation and club selection.
 * The function uses axios to make HTTP requests to the server.
 * @param {string} club_id - The ID of the club to display.
 */
export function clubDetails(club_id) {
    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage', hides the club details page, and loads the homepage module.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetails.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions', hides the club details page, and loads the competitions module.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let clubDetailsPage = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetailsPage.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs', hides the club details page, and loads the clubs module.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetails.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players', hides the club details page, and loads the players module.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetails.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./players.js")
            .then(module => {
                module.players();
            });
    }

    /**
     * The showPlayerDetailsPage function is responsible for displaying a specific player's page.
     * It changes the current view to 'playerDetails', hides the club details page, and loads the playerDetails module.
     * @param {string} playerId - The ID of the player to display.
     */
    let showPlayerDetailsPage = (playerId) => {
        let playerPage = document.getElementsByClassName("playerDetailsPage")[0];
        window.currentView = "playerDetails";
        playerPage.classList.remove("hide");
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetails.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./playerDetails.js")
            .then(module => {
                module.playerDetails(playerId);
            });
    }

    /**
     * The showMatchDetailsPage function is responsible for displaying a specific match's page.
     * It changes the current view to 'matchDetails', hides the club details page, and loads the matchDetails module.
     * @param {string} gameId - The ID of the game to display.
     * @param {string} homeClub - The name of the home club in the game.
     * @param {string} homeClubId - The ID of the home club in the game.
     * @param {string} awayClub - The name of the away club in the game.
     * @param {string} awayClubId - The ID of the away club in the game.
     * @param {string} aggregate - The aggregate score of the game.
     * @param {string} referee - The name of the referee of the game.
     * @param {string} date - The date of the game.
     * @param {string} stadium - The name of the stadium where the game was played.
     */
    let showMatchDetailsPage = (gameId,homeClub,homeClubId,awayClub,awayClubId,aggregate,referee,date,stadium) => {
        let matchDetailsPage = document.getElementsByClassName("matchDetailsPage")[0];
        window.currentView = "matchDetails";
        matchDetailsPage.classList.remove("hide");
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        clubDetails.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./matchDetails.js")
            .then(module => {
                module.matchDetails(gameId,homeClub,homeClubId,awayClub,awayClubId,aggregate,referee,date,stadium);
            });
    }

    /**
     * The changePage function is responsible for changing the page view.
     * It updates the filter options based on the current page.
     */
    function changePage(){
        document.getElementById("filter-position-club").value = "allPlayersClub";
        document.getElementById("filter-games-club").value = "All";
    }

    // Code to get club details and display them
    if (window.currentView === "clubDetails") {
        document.querySelector(`input[name="playerRole"][value="allPlayersClub"]`).checked = true;
        document.querySelector(`input[name="gamesFilter"][value="All"]`).checked = true;
        axios.get(`http://localhost:8081/club/getClubDetailsById/${club_id}`)
            .then(response => {
                const clubTitle = document.getElementsByClassName("table-title-clubDetails")[0];
                clubTitle.innerHTML = "";
                clubTitle.innerHTML += `<span id="team-name-clubDetails-Big">${response.data.name}</span>`;
                const clubDetails = document.getElementsByClassName("list-unstyled-clubDetials")[0];
                clubDetails.innerHTML = "";
                clubDetails.innerHTML += `<li><span class="club-name-details">Stadium name: </span><span>${response.data.stadium_name}</span></li>`;
                clubDetails.innerHTML += `<li><span class="club-name-details">Stadium seats: </span><span>${response.data.stadium_seats}</span></li>`;
                clubDetails.innerHTML += `<li><span class="club-name-details">Last season: </span><span>${response.data.last_season}</span></li>`;

                const teamPlayersContainer = document.querySelector(".list-unstyled-clubDetails-players");
                teamPlayersContainer.innerHTML = "";
                const teamPlayersEffectuallyContainer = document.getElementById("team-players-container");
                axios.get(`http://localhost:8081/player/getPlayerIdNameClub/${club_id}`)
                    .then(response => {

                        let Players = response.data;
                        if(Players.length === 0){
                            teamPlayersEffectuallyContainer.style.display = "none";
                        }else{
                        teamPlayersEffectuallyContainer.style.display = "block";
                        let numPlayers = Players.length;
                        if (numPlayers <= 10) {
                            teamPlayersContainer.classList.add("team-players-10");
                        } else {
                            teamPlayersContainer.classList.add("team-players-big");
                        }
                        Players.forEach(player => {
                            let playerLi = document.createElement("li");
                            let img = document.createElement("img");
                            img.className = "club-player-image";
                            img.src = player.image_url;
                            playerLi.appendChild(img);
                            playerLi.innerHTML += `<span>${player.player_name}</span>`;
                            teamPlayersContainer.appendChild(playerLi);

                            let playerDetailsAction = (event) => {
                                showPlayerDetailsPage(player.player_id);
                            }
                            playerLi.addEventListener("click", playerDetailsAction);
                            img.addEventListener("click", playerDetailsAction);
                        });
                        let formElement = document.getElementById('filter-position-club');
                        formElement.addEventListener('change', function () {
                            let selectedRole = this.playerRole.value;
                            let filteredPlayers;

                            if (selectedRole === "allPlayersClub") {
                                filteredPlayers = Players;
                            } else {
                                filteredPlayers = Players.filter(player => player.position === selectedRole);
                            }

                            teamPlayersContainer.innerHTML = "";
                            filteredPlayers.forEach(player => {
                                let playerLi = document.createElement("li");
                                let img = document.createElement("img");
                                img.className = "club-player-image";
                                img.src = player.image_url;
                                playerLi.appendChild(img);
                                playerLi.innerHTML += `<span>${player.player_name}</span>`;

                                let playerDetailsAction = (event) => {
                                    showPlayerDetailsPage(player.player_id);
                                };

                                playerLi.addEventListener("click", playerDetailsAction);
                                img.addEventListener("click", playerDetailsAction);

                                teamPlayersContainer.appendChild(playerLi);
                            });
                        });
                        }



                    })
                    .catch(error => console.error('Error:', error));


            })
            .catch(error => console.error('Error:', error));

        // Code to get games by club id and display them
        axios.get(`http://localhost:3001/games-byclubid?club_id=${club_id}`)
            .then(response => {
                const data = response.data;
                const table = document.getElementById('games-played-club');
                const tbody = table.querySelector('tbody');
                tbody.innerHTML = '';

                let awayClub;
                data.forEach(item => {
                    axios.get(`http://localhost:8081/club/getClubDetailsById/${item.home_club_id}`)
                        .then(response => {
                            const homeClub = response.data.name;
                            axios.get(`http://localhost:8081/club/getClubDetailsById/${item.away_club_id}`)
                                .then(response => {
                                    awayClub = response.data.name;
                                    let dateString = item.date;
                                    let date = new Date(dateString);

                                    let day = date.getDate();
                                    let month = date.getMonth() + 1;
                                    let year = date.getFullYear();

                                    if (day < 10) day = '0' + day;
                                    if (month < 10) month = '0' + month;

                                    let formattedDate = day + '/' + month + '/' + year;
                                    const tr = document.createElement('tr');
                                    tr.innerHTML = `
                                        <td data-game-id="${item.game_id}">${homeClub}</td>
                                        <td data-game-id="${item.game_id}">${item.aggregate}</td>
                                        <td data-game-id="${item.game_id}">${awayClub}</td>
                                        <td data-game-id="${item.game_id}">${item.referee}</td>
                                        <td data-game-id="${item.game_id}">${formattedDate}</td>
                                                                  `;
                                    tr.addEventListener('click', (function(gameId, homeClub, awayClub, aggregate, referee, formattedDate, stadium) {
                                        return function(event) {
                                            showMatchDetailsPage(gameId, homeClub, item.home_club_id, awayClub, item.away_club_id, aggregate, referee, formattedDate, stadium);
                                        };
                                    })(item.game_id, homeClub, awayClub, item.aggregate, item.referee, formattedDate, item.stadium));
                                    tbody.appendChild(tr);
                                })
                                .catch(error => console.error('Error:', error));
                        })
                        .catch(error => console.error('Error:', error));
                });

                // Event listeners for games selection
                let formElementGames = document.getElementById('filter-games-club');
                formElementGames.addEventListener('change', function () {
                    let selectedGame = this.gamesFilter.value;
                    let filteredGames = data.filter(function (games) {
                        if (selectedGame === "All")
                            return games;
                        else if (selectedGame === "Win") {
                            if (club_id === games.home_club_id && games.home_club_goals > games.away_club_goals)
                                return games;
                            else if (club_id === games.away_club_id && games.away_club_goals > games.home_club_goals)
                                return games;
                        } else if (selectedGame === "Draw") {
                            if (club_id === games.home_club_id && games.home_club_goals === games.away_club_goals)
                                return games;
                            else if (club_id === games.away_club_id && games.away_club_goals === games.home_club_goals)
                                return games;

                        } else if (selectedGame === "Lost") {
                            if (club_id === games.home_club_id && games.home_club_goals < games.away_club_goals)
                                return games;
                            else if (club_id === games.away_club_id && games.away_club_goals < games.home_club_goals)
                                return games;
                        } else if (selectedGame === "HomeGame") {
                            if (club_id === games.home_club_id)
                                return games;
                        } else if (selectedGame === "AwayGame") {
                            if (club_id === games.away_club_id)
                                return games;
                        }
                    });
                    const table = document.getElementById('games-played-club');
                    const tbody = table.querySelector('tbody');
                    tbody.innerHTML = '';
                    filteredGames.forEach(game => {
                        const homeClubGames = game.home_club_name;
                        const awayClubGames = game.away_club_name;
                        let dateString = game.date;
                        let date = new Date(dateString);

                        let day = date.getDate();
                        let month = date.getMonth() + 1;
                        let year = date.getFullYear();

                        if (day < 10) day = '0' + day;
                        if (month < 10) month = '0' + month;

                        let formattedDate = day + '/' + month + '/' + year;
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td data-game-id="${game.game_id}">${homeClubGames}</td>
                            <td data-game-id="${game.game_id}">${game.aggregate}</td>
                            <td data-game-id="${game.game_id}">${awayClubGames}</td>
                            <td data-game-id="${game.game_id}">${game.referee}</td>
                            <td data-game-id="${game.game_id}">${formattedDate}</td>
                                                      `;
                        tr.addEventListener('click', function(event) {
                            const gameId = event.target.getAttribute('data-game-id');
                            showMatchDetailsPage(gameId,homeClubGames,game.home_club_id,awayClubGames,game.away_club_id,game.aggregate,game.referee,formattedDate,game.stadium);
                        });
                        tbody.appendChild(tr);
                    })

                });
            })
            .catch(error => console.error('Error:', error));

        // Event listeners for navigation
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
