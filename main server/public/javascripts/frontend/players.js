/**
 * The players function is responsible for managing the players page.
 * It includes functions to show different pages, change the page, display players, update pagination, and get players.
 * It also includes event listeners for page navigation, sorting options, and search bar.
 * The function uses axios to make HTTP requests to the server.
 */
export function players() {
    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage' and hides the players page.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let players = document.getElementsByClassName("playersPage")[0];
        players.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions' and hides the players page.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let players = document.getElementsByClassName("playersPage")[0];
        players.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs' and hides the players page.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let playersPage = document.getElementsByClassName("playersPage")[0];
        playersPage.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showPlayerPage function is responsible for displaying a specific player's page.
     * It changes the current view to 'playerDetails' and hides the players page.
     * @param {string} playerId - The ID of the player to display.
     */
    let showPlayerPage = (playerId) => {
        let playerPage = document.getElementsByClassName("playerDetailsPage")[0];
        window.currentView = "playerDetails";
        playerPage.classList.remove("hide");
        let players = document.getElementsByClassName("playersPage")[0];
        players.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./playerDetails.js")
            .then(module => {
                module.playerDetails(playerId);
            });
    }

    /**
     * The changePage function is responsible for resetting the sort options and search bar when the page changes.
     */
    function changePage() {
        document.getElementById("sortOptions-players").value = "default";
        document.getElementById("searchBar-players").style.display = "block";
        document.getElementById("filters-players-page").style.display = "block";
        currentSortDirection = "default";
        let searchBar = document.getElementById('searchBar-players');
        searchBar.value = '';
    }

    let currentPage = 1;
    const itemsPerPage = 51;
    let sortedPlayers = [];
    let totalPlayersCount = 0;
    let currentSortDirection = "default";
    let currentSortBy = "name";

    /**
     * The displayPlayers function is responsible for displaying a list of players.
     * @param {Array} players - The list of players to display.
     * @param {HTMLElement} playersContainer - The container to display the players in.
     */
    function displayPlayers(players, playersContainer) {
        playersContainer.innerHTML = "";
        players.forEach(player => {
            let li = document.createElement('li');
            li.textContent = player.player_name;
            li.addEventListener('click', () => showPlayerPage(player.player_id));
            playersContainer.appendChild(li);
        });
    }

    /**
     * The updatePagination function is responsible for updating the pagination buttons based on the current page and total number of players.
     * @param {number} totalPlayersCount - The total number of players.
     * @param {number} currentPage - The current page number.
     */
    function updatePagination(totalPlayersCount, currentPage) {
        let totalPages = Math.ceil(totalPlayersCount / itemsPerPage);
        let prevPageButton = document.getElementById('prevPage');
        let nextPageButton = document.getElementById('nextPage');

        if (currentPage <= 1) {
            prevPageButton.style.display = 'none';
        } else {
            prevPageButton.style.display = 'block';
            prevPageButton.disabled = (currentPage === 1);
        }

        if (currentPage >= totalPages) {
            nextPageButton.style.display = 'none';
        } else {
            nextPageButton.style.display = 'block';
            nextPageButton.disabled = (currentPage === totalPages);
        }
    }

    /**
     * The loadPage function is responsible for loading a page of players.
     * @param {number} pageNumber - The page number to load.
     * @param {Array} playersToDisplay - The list of players to display.
     * @param {number} totalPlayersCount - The total number of players.
     */
    function loadPage(pageNumber, playersToDisplay, totalPlayersCount) {
        currentPage = pageNumber;
        let playersContainer = document.getElementById("players-ul");
        displayPlayers(playersToDisplay, playersContainer);
        updatePagination(totalPlayersCount, pageNumber);
    }

    // Event listeners for page navigation
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage >= 1) {
            currentPage++;
            getPlayers(currentPage);
        }
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            getPlayers(currentPage);
        }
    });

    document.getElementById("sortOptions-players").addEventListener("change", function () {
        currentSortDirection = this.value;
        currentPage = 1;
        getPlayers(currentPage);
    });

    /**
     * The getPlayers function is responsible for getting a page of players from the server.
     * It uses axios to make a GET request to the server.
     * @param {number} page - The page number to get. Defaults to 1.
     * @param {string} query - The search query. Defaults to an empty string.
     */
    function getPlayers(page = 1, query = "") {
        let sortParam = currentSortDirection !== "default" ? `&sortDirection=${currentSortDirection}&sortBy=${currentSortBy}` : "";
        let searchParam = query ? `&query=${query}` : "";
        let url = query ? `http://localhost:8081/player/searchPlayers?page=${page - 1}&size=${itemsPerPage}${sortParam}${searchParam}`
            : `http://localhost:8081/player/getPlayerIdsAndNamesPage?page=${page - 1}&size=${itemsPerPage}${sortParam}`;
        axios.get(url)
            .then(response => {
                let players = response.data;
                totalPlayersCount = response.data.totalElements;
                sortedPlayers = [...players];
                loadPage(currentPage, sortedPlayers, totalPlayersCount);
            })
            .catch(error => console.error('Error:', error));
    }

// Event listeners for filter and search bar
    let formElement = document.getElementById('filter-players');
    formElement.addEventListener('change', function () {
        let selectedPlayers = this.playersFilter.value;
        if (selectedPlayers === "allplayers") {
            document.getElementById("filters-players-page").style.display = "block";
            document.getElementById("sortOptions-players").value = "default";
            document.getElementById("searchBar-players").style.display = "block";
            let playersContainer = document.getElementById("players-ul");
            playersContainer.innerHTML = "";
            currentPage = 1;
            getPlayers(currentPage);
        } else {
            document.getElementById("filters-players-page").style.display = "none";
            document.getElementById("sortOptions-players").value = "default";
            document.getElementById("searchBar-players").style.display = "none";
            let playersContainer = document.getElementById("players-ul");
            playersContainer.innerHTML = "";
            axios.get("http://localhost:3001/appearances-mostappearedplayers")
                .then(response => {
                    let filteredPlayers = response.data;
                    sortedPlayers = [...filteredPlayers];
                    currentSortDirection = "default";
                    loadPage(1, filteredPlayers, filteredPlayers.length);
                })
                .catch(error => console.error('Error:', error));
        }
    });

    let searchBar = document.getElementById('searchBar-players');
    searchBar.addEventListener('input', function () {
        let query = searchBar.value.toLowerCase();
        if(query===""){
            currentPage = 1;
            getPlayers(currentPage);
        }
        currentPage = 1;
        getPlayers(currentPage, query);
    });




// Initialization code for the players page
    let playersLoaded = false;
    if (window.currentView === "players" && !playersLoaded) {
        document.querySelector(`input[name="playersFilter"][value="allplayers"]`).checked = true;
        let logo = document.getElementById("logo-logo");
        if (logo) {
            logo.addEventListener("click", showHomePage);
        }

        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);
        let clubs = document.getElementById("club-navbar");
        clubs.addEventListener("click", showClubsPage);
        playersLoaded = true;
        getPlayers();
    }

}