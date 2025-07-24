/**
 * The competitions function is responsible for managing the competitions page.
 * It includes functions to show different pages, display competitions, and get competition details.
 * It also includes event listeners for navigation and competition selection.
 * The function uses axios to make HTTP requests to the server.
 */
export function competitions() {
    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage', hides the competitions page, and loads the homepage module.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        competitionsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }
    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs', hides the competitions page, and loads the clubs module.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        competitionsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players', hides the competitions page, and loads the players module.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        competitionsPage.classList.add("hide");
        window.scrollTo(0, 0);
        import("./players.js")
            .then(module => {
                module.players();
            });
    }

    /**
     * The showCompetitionDetails function is responsible for displaying a specific competition's page.
     * It changes the current view to 'competitionDetails', hides the competitions page, and loads the competitionDetails module.
     * @param {Event} event - The event that triggered the function.
     * @param {string} competition_id - The ID of the competition to display.
     * @param {string} competition_name - The name of the competition to display.
     * @param {string} domestic_league_code - The domestic league code of the competition to display.
     */
    let showCompetitionDetails = (event, competition_id, competition_name, domestic_league_code) => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        competitionsPage.classList.add("hide");
        let competitionDetailsPage = document.getElementsByClassName("competitionDetailsPage")[0];
        competitionDetailsPage.classList.remove("hide");
        window.currentView = "competitionDetails";
        window.scrollTo(0, 0);
        import("./competitionDetails.js")
            .then(module => {
                module.competitionDetails(competition_id, competition_name, domestic_league_code);
            });
    }

    /**
     * The displayCompetitions function is responsible for displaying a list of competitions.
     * @param {Array} data - The list of competitions to display.
     * @param {string} country - The country of the competitions to display.
     */
    function displayCompetitions(data, country) {
        let countryName = country.toUpperCase();
        let competitonstitle = document.getElementById('competitions-title');
        if (country === "ALL") {
            competitonstitle.innerHTML = `ALL COMPETITIONS`;
        } else {
            competitonstitle.innerHTML = `COMPETITIONS IN ${countryName}`;
        }
        const competitionsContainer = document.querySelector("#competitions-ul");
        competitionsContainer.innerHTML = "";
        data.forEach(competitions => {
            let formattedName = competitions.name.replace(/-/g, ' ');
            formattedName = formattedName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            let li = document.createElement("li");
            li.innerHTML += `<span >${formattedName}</span>`;
            competitionsContainer.appendChild(li);
            li.addEventListener("click", (event) => {
                let competitionsElement = document.getElementsByClassName("competitionsPage")[0];
                competitionsElement.classList.add("hide");
                showCompetitionDetails(event, competitions.competition_id, competitions.name, competitions.domestic_league_code);
            });
        })

    }

    // Code to get competition details and display them
    if (window.currentView === "competitions") {
        if (window.previousView !== "competitionDetails") {
            axios.get('http://localhost:8081/competition/getCompetitionIdsNamesCountries')
                .then(response => {
                    const competitionsContainer = document.querySelector("#competitions-ul");
                    competitionsContainer.innerHTML = "";
                    const countrySelection = document.getElementById('countrySelect');
                    countrySelection.innerHTML = "";
                    const titleCompetition = document.getElementById('competitions-title');
                    titleCompetition.innerHTML = `ALL COMPETITIONS`;
                    response.data.forEach(competitions => {
                        let formattedName = competitions.name.replace(/-/g, ' ');
                        formattedName = formattedName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        let li = document.createElement("li");
                        li.innerHTML += `<span class="competition-li">${formattedName}</span>`;
                        li.addEventListener("click", (event) => {
                            let competitionsElement = document.getElementsByClassName("competitionsPage")[0];
                            competitionsElement.classList.add("hide");
                            showCompetitionDetails(event, competitions.competition_id, competitions.name, competitions.domestic_league_code);
                        });
                        competitionsContainer.appendChild(li);
                    })
                    let countries = [...new Set(response.data.map(item => item.country_name))];
                    let countrySelect = document.getElementById('countrySelect');
                    let defaultOption = document.createElement('option');
                    defaultOption.value = "";
                    defaultOption.text = "All countries";
                    defaultOption.style.pointerEvents = "none";
                    countrySelect.insertBefore(defaultOption, countrySelect.firstChild);
                    countries.forEach(country => {
                        let option = document.createElement('option');
                        option.value = country;
                        option.text = country;
                        countrySelect.appendChild(option);
                    });
                    countrySelect.addEventListener('change', function () {
                        let selectedCountry = this.value;

                        if (selectedCountry === "") {
                            displayCompetitions(response.data, "ALL");
                            return;
                        }
                        let filteredData = response.data.filter(item => item.country_name === selectedCountry);
                        displayCompetitions(filteredData, selectedCountry);
                    });
                })
                .catch(error => console.error('Error:', error))

            // Event listeners for navigation and competition selection
            let logo = document.getElementById("logo-logo");
            if (logo) {
                logo.addEventListener("click", showHomePage);
            }

            let clubsPageButton = document.getElementById("club-navbar");
            clubsPageButton.addEventListener("click", showClubsPage);
            let playersPageButton = document.getElementById("player-navbar");
            playersPageButton.addEventListener("click", showPlayersPage);
        }
    }


}
