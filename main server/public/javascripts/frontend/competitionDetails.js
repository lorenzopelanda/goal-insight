/**
 * The competitionDetails function is responsible for managing the competition details page.
 * It includes functions to show different pages, display competition clubs, and get competition details.
 * It also includes event listeners for navigation and club selection.
 * The function uses axios to make HTTP requests to the server.
 * @param {string} competition_id - The ID of the competition to display.
 * @param {string} competition_name - The name of the competition to display.
 * @param {string} domestic_league_code - The domestic league code of the competition to display.
 */
export function competitionDetails(competition_id, competition_name, domestic_league_code){
    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage', hides the competition details page, and loads the homepage module.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let competitionsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }
    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions', hides the competition details page, and loads the competitions module.
     */
    let showCompetitionsPage=()=>{
        let competitionsPage=document.getElementsByClassName("competitionsPage")[0];
        window.currentView="competitions";
        competitionsPage.classList.remove("hide");
        let competitionClubsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionClubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./competitions.js")
            .then(module=>{
                module.competitions();
            });
    }
    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs', hides the competition details page, and loads the clubs module.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let competitionClubsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionClubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }
    /**
     * The showClubDetails function is responsible for displaying a specific club's page.
     * It changes the current view to 'clubDetails', hides the competition details page, and loads the clubDetails module.
     * @param {string} club_id - The ID of the club to display.
     */
    let showClubDetails = (club_id) => {
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        window.currentView = "clubDetails";
        clubDetails.classList.remove("hide");
        let competitionClubsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionClubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubDetails.js")
            .then(module => {
                module.clubDetails(club_id);
            });
    }
    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players', hides the competition details page, and loads the players module.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let competitionClubsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionClubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./players.js")
            .then(module => {
                module.players();
            });
    }
    // Code to get competition details and display them
    if (window.currentView === "competitionDetails") {
        document.getElementById("sortOptions-competitionDetails").value = "default";
        const competitionTitle = document.getElementById("competition-clubs-title");
        competitionTitle.innerHTML = "";
        let formattedName = competition_name.replace(/-/g, ' ');
        formattedName = formattedName.toUpperCase();
        competitionTitle.innerHTML += `<span>${formattedName}</span>`;
        axios.get(`http://localhost:8081/club/getCompetitionClubsById/${competition_id}`)
            .then(response => {
                if (response.data.length === 0) {
                    axios.get(`http://localhost:8081/club/getCompetitionClubsById/${domestic_league_code}`)
                        .then(response => {
                            const competitionClubsContainer = document.querySelector('#competition-clubs-ul');
                            competitionClubsContainer.innerHTML = "";
                            response.data.forEach(club => {
                                let li = document.createElement("li");
                                li.innerHTML += `<span >${club.club_name}</span>`;
                                competitionClubsContainer.appendChild(li);
                                li.addEventListener("click", (event) => {
                                    showClubDetails(club.club_id);
                                });
                            })
                            let clubs = [...response.data];
                            let originalClubs = [...clubs];
                            let clubsSelect = document.getElementById("sortOptions-competitionDetails");
                            clubsSelect.addEventListener("change", function () {
                                if(this.value === "asc"){
                                    clubs.sort((a, b) => a.club_name.localeCompare(b.club_name));
                                }
                                else if(this.value === "desc"){
                                    clubs.sort((a, b) => b.club_name.localeCompare(a.club_name));
                                }
                                else if(this.value === "default"){
                                    clubs = [...originalClubs];
                                }
                                competitionClubsContainer.innerHTML = "";

                                clubs.forEach(club => {
                                    let li = document.createElement("li");
                                    li.innerHTML += `<span >${club.club_name}</span>`;
                                    competitionClubsContainer.appendChild(li);
                                    li.addEventListener("click", (event) => {
                                        showClubDetails(club.club_id);
                                    });
                                });
                            });


                        })
                        .catch(error => console.error('Error:', error));
                } else {
                    const competitionClubsContainer = document.querySelector('#competition-clubs-ul');
                    competitionClubsContainer.innerHTML = "";
                    response.data.forEach(club => {
                        let li = document.createElement("li");
                        li.innerHTML += `<span >${club.club_name}</span>`;
                        competitionClubsContainer.appendChild(li);
                        li.addEventListener("click", (event) => {
                            showClubDetails(club.club_id);
                        });
                    })
                    let clubs = [...response.data];
                    let originalClubs = [...clubs];
                    let clubsSelect = document.getElementById("sortOptions-competitionDetails");

                    clubsSelect.addEventListener("change", function () {
                        if(this.value === "asc"){
                            clubs.sort((a, b) => a.club_name.localeCompare(b.club_name));
                        }
                        else if(this.value === "desc"){
                            clubs.sort((a, b) => b.club_name.localeCompare(a.club_name));
                        }
                        else if(this.value === "default"){
                            clubs = [...originalClubs];
                        }
                        competitionClubsContainer.innerHTML = "";

                        clubs.forEach(club => {
                            let li = document.createElement("li");
                            li.innerHTML += `<span >${club.club_name}</span>`;
                            competitionClubsContainer.appendChild(li);
                            li.addEventListener("click", (event) => {
                                showClubDetails(club.club_id);
                            });
                        });
                    });
                }
            })
            .catch(error => console.error('Error:', error));

        // Event listeners for navigation and club selection
        let logo = document.getElementById("logo-logo");
        if (logo) {
            logo.addEventListener("click", showHomePage);
        }

        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);
        let backToCompetitions = document.getElementById("back-to-competitions");
        backToCompetitions.addEventListener("click", showCompetitionsPage);

        let clubsPageButton = document.getElementById("club-navbar");
        clubsPageButton.addEventListener("click", showClubsPage);
        let players = document.getElementById("player-navbar");
        players.addEventListener("click", showPlayersPage);
    }


}
