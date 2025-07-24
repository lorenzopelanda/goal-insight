/**
 * The playerDetails function is responsible for managing the player details page.
 * It includes functions to show different pages, format market value, and get player details.
 * It also includes event listeners for logo, competitions, clubs, and players.
 * The function uses axios to make HTTP requests to the server.
 * @param {string} playerId - The ID of the player to display.
 */
export function playerDetails(playerId) {

    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage' and hides the player details page.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let playerDetails = document.getElementsByClassName("playerDetailsPage")[0];
        playerDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions' and hides the player details page.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let playerDetails = document.getElementsByClassName("playerDetailsPage")[0];
        playerDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs' and hides the player details page.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let playerDetails = document.getElementsByClassName("playerDetailsPage")[0];
        playerDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showClubDetails function is responsible for displaying a specific club's page.
     * It changes the current view to 'clubDetails' and hides the player details page.
     * @param {string} club_id - The ID of the club to display.
     */
    let showClubDetails = (club_id) => {
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        window.currentView = "clubDetails";
        clubDetails.classList.remove("hide");
        let playerDetails = document.getElementsByClassName("playerDetailsPage")[0];
        playerDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubDetails.js")
            .then(module => {
                module.clubDetails(club_id);
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players' and hides the player details page.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let playerDetails = document.getElementsByClassName("playerDetailsPage")[0];
        playerDetails.classList.add("hide");
        window.scrollTo(0, 0);
        import("./players.js")
            .then(module => {
                module.players();
            });
    }

    /**
     * The formatMarketValue function is responsible for formatting the market value.
     * @param {number} value - The market value to format.
     * @returns {string} The formatted market value.
     */
    function formatMarketValue(value) {
        if(value === null) return "N/A";
        if (value >= 1000000) {
            return (value / 1000000).toLocaleString() + 'mln &euro;';
        } else if (value >= 1000) {
            return (value / 1000).toLocaleString() + 'k &euro;';
        } else {
            return value.toString();
        }
    }

    // Code to get player details and display them
    if (window.currentView === "playerDetails"){
        document.querySelector(`input[name="playerFilter"][value="AllStats"]`).checked = true;
        axios.get(`http://localhost:8081/player/getPlayerDetailsById/${playerId}`)
            .then(response => {
                let playerDetails = response.data;
                let lastSeason = playerDetails.last_season;
                let playerPicture = document.getElementById("player-photo-player-page");
                playerPicture.innerHTML = "";
                playerPicture.innerHTML += `<img class="img-fluid" src="${playerDetails.image_url}" alt="player photo">`;
                let playerName = document.getElementById("player-name-title");
                playerName.innerHTML = "";
                playerName.innerHTML += `<span>${playerDetails.name}</span>`;
                let playerInfos = document.getElementsByClassName("list-unstyled-playerDetails")[0];
                playerInfos.innerHTML = "";
                let dateString = playerDetails.date_of_birth;
                let date = new Date(dateString);

                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                if (day < 10) day = '0' + day;
                if (month < 10) month = '0' + month;

                let formattedDate = day + '/' + month + '/' + year;
                playerInfos.innerHTML += `
<li>Nationality: <span>${playerDetails.country_of_citizenship}</span></li>
<li>Date of birth: <span>${formattedDate}</span></li>
<li>Height: <span>${playerDetails.height_in_cm} cm</span> </li>
<li>Foot: <span>${playerDetails.foot}</span></li>
<li>Last played season: <span>${playerDetails.last_season}</span></li>
<li >Club: <span id="playerDetails-club-li">${playerDetails.current_club_name}</span></li>
<li>Position: <span>${playerDetails.position}</span>, <span>${playerDetails.sub_position}</span></li>
<li>Highest market value: <span>${formatMarketValue(playerDetails.highest_market_value_in_eur)}</span></li>
<li>Market value: <span>${formatMarketValue(playerDetails.market_value_in_eur)}</span></li>`;
                let playerClub = document.getElementById("playerDetails-club-li");
                playerClub.addEventListener("click", () => {
                    showClubDetails(playerDetails.current_club_id);
                });

                axios.get(`http://localhost:3001/appearances-byplayerid?player_id=${playerId}`)
                    .then(response => {
                        let playerAppearances = response.data;
                        let numPlayerApp = playerAppearances.length;
                        let numPlayerMinutes = 0;
                        let numPlayerGoals = 0;
                        let numPlayerAssists = 0;
                        let numPlayerYellowCards = 0;
                        let numPlayerRedCards = 0;
                        playerAppearances.forEach(appearance => {
                            numPlayerMinutes += appearance.minutes_played;
                            numPlayerGoals += appearance.goals;
                            numPlayerAssists += appearance.assists;
                            numPlayerYellowCards += appearance.yellow_cards;
                            numPlayerRedCards += appearance.red_cards;
                        });
                        let playerStats = document.getElementsByClassName("playerDetails-stats-table")[0];
                        playerStats.innerHTML = "";
                        playerStats.innerHTML += `
                        <li>Played games: <span>${numPlayerApp}</span></li>
                        <li>Minutes played: <span>${numPlayerMinutes}</span></li>
                                <li>Yellow cards: <span>${numPlayerYellowCards}</span></li>
                                <li>Goals made: <span>${numPlayerGoals}</span></li>
                                <li>Red cards: <span>${numPlayerRedCards}</span></li>
                                <li>Assists made: <span>${numPlayerAssists}</span></li>`;

                        let formElement = document.getElementById('filter-player-stats');
                        formElement.addEventListener('change', function () {
                            let selectedSeason = this.playerFilter.value;
                            let filteredSeason = playerAppearances.filter(function (appearance) {
                                let appearanceYear = new Date(appearance.date).getFullYear();
                                if (selectedSeason === "AllStats")
                                    return appearance;
                                else if (selectedSeason === "LastSeason")
                                    return appearanceYear === lastSeason;
                            });
                            playerStats.innerHTML = "";
                            let numPlayerApp = filteredSeason.length;
                            let numPlayerMinutes = 0;
                            let numPlayerGoals = 0;
                            let numPlayerAssists = 0;
                            let numPlayerYellowCards = 0;
                            let numPlayerRedCards = 0;
                            filteredSeason.forEach(appearance => {
                                numPlayerMinutes += appearance.minutes_played;
                                numPlayerGoals += appearance.goals;
                                numPlayerAssists += appearance.assists;
                                numPlayerYellowCards += appearance.yellow_cards;
                                numPlayerRedCards += appearance.red_cards;
                            });
                            playerStats.innerHTML += `
                        <li>Played games: <span>${numPlayerApp}</span></li>
                        <li>Minutes played: <span>${numPlayerMinutes}</span></li>
                                <li>Yellow cards: <span>${numPlayerYellowCards}</span></li>
                                <li>Goals made: <span>${numPlayerGoals}</span></li>
                                <li>Red cards: <span>${numPlayerRedCards}</span></li>
                                <li>Assists made: <span>${numPlayerAssists}</span></li>`;

                        });

                    })
            })
            .catch(error => console.error('Error:', error));


        // Event listeners for logo, competitions, clubs, and players
        let logo = document.getElementById("logo-logo");
        if (logo) {
            logo.addEventListener("click", showHomePage);
        }

        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);
        let clubs = document.getElementById("club-navbar");
        clubs.addEventListener("click", showClubsPage);
        let players = document.getElementById("player-navbar");
        players.addEventListener("click", showPlayersPage);
        }






}


