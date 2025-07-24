/**
 * The clubs function is responsible for managing the clubs page.
 * It includes functions to show different pages, display clubs, and get club details.
 * It also includes event listeners for navigation and club selection.
 * The function uses axios to make HTTP requests to the server.
 */
export function clubs() {
    /**
     * The showHomePage function is responsible for displaying the home page.
     * It changes the current view to 'homepage', hides the clubs page, and loads the homepage module.
     */
    let showHomePage = () => {
        let homepagePage = document.getElementsByClassName("homepage-homepage")[0];
        homepagePage.classList.remove("hide");
        let chatContainer = document.getElementsByClassName("chat-container")[0];
        chatContainer.classList.remove("hide");
        let backgroundHomepage = document.getElementsByClassName("background-div-homepage")[0];
        backgroundHomepage.classList.remove("hide");
        window.currentView = "homepage";
        let clubs = document.getElementsByClassName("clubsPage")[0];
        clubs.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./homepage.js")
            .then(module => {
                module.setup();
            });
    }

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions', hides the clubs page, and loads the competitions module.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        clubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubDetails function is responsible for displaying a specific club's page.
     * It changes the current view to 'clubDetails', hides the clubs page, and loads the clubDetails module.
     * @param {string} club_id - The ID of the club to display.
     */
    let showClubDetails = (club_id) => {
        let clubDetails = document.getElementsByClassName("clubDetailsPage")[0];
        window.currentView = "clubDetails";
        clubDetails.classList.remove("hide");
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        clubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./clubDetails.js")
            .then(module => {
                module.clubDetails(club_id);
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players', hides the clubs page, and loads the players module.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        clubsPage.classList.add("hide");
        window.scrollTo(0, 0);
        changePage();
        import("./players.js")
            .then(module => {
                module.players();
            });
    }

    let currentPage = 1;
    const itemsPerPage = 51;
    let sortedClubs = [];
    let totalClubsCount = 0;
    let currentSortDirection = "default";
    let currentSortBy = "name";

    /**
     * The changePage function is responsible for changing the page view.
     * It updates the sort options, filter options, and search bar visibility based on the current page.
     */
    function changePage() {
        document.getElementById("sortOptions-clubs").value = "default";
        document.getElementById("filter-clubs").value = "allClubs";
        document.getElementById("searchBar-clubs").style.display = "block";
        document.getElementById("filters-clubs-page").style.display = "block";
        let searchBar = document.getElementById('searchBar-clubs');
        searchBar.value = '';
    }

    /**
     * The displayClubs function is responsible for displaying a list of clubs.
     * @param {Array} clubs - The list of clubs to display.
     * @param {HTMLElement} clubsContainer - The HTML element to display the clubs in.
     */
    function displayClubs(clubs, clubsContainer) {
        clubsContainer.innerHTML = "";
        clubs.forEach(club => {
            let li = document.createElement('li');
            li.textContent = club.club_name;
            li.addEventListener('click', () => showClubDetails(club.club_id));
            clubsContainer.appendChild(li);
        });
    }

    /**
     * The updatePagination function is responsible for updating the pagination buttons.
     * @param {number} totalClubsCount - The total number of clubs.
     * @param {number} currentPage - The current page number.
     */
    function updatePagination(totalClubsCount, currentPage) {
        let totalPages = Math.ceil(totalClubsCount / itemsPerPage);
        let prevPageButton = document.getElementById('prevPageClubs');
        let nextPageButton = document.getElementById('nextPageClubs');

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
     * The loadPage function is responsible for loading a page of clubs.
     * @param {number} pageNumber - The page number to load.
     * @param {Array} clubsToDisplay - The clubs to display on the page.
     * @param {number} totalClubsCount - The total number of clubs.
     */
    function loadPage(pageNumber, clubsToDisplay, totalClubsCount) {
        currentPage = pageNumber;
        let clubsContainer = document.getElementById("clubs-ul");
        displayClubs(clubsToDisplay, clubsContainer);
        updatePagination(totalClubsCount, pageNumber);
    }

    document.getElementById('nextPageClubs').addEventListener('click', () => {
        if (currentPage >= 1) {
            currentPage++;
            getClubs(currentPage);
        }
    });

    document.getElementById('prevPageClubs').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            getClubs(currentPage);
        }
    });

    document.getElementById("sortOptions-clubs").addEventListener("change", function () {
        currentSortDirection = this.value;
        currentPage = 1;
        getClubs(currentPage);
    });

    /**
     * The getClubs function is responsible for getting a page of clubs from the server.
     * @param {number} page - The page number to get (default is 1).
     * @param {string} query - The search query (default is an empty string).
     */
    function getClubs(page = 1, query = "") {
        let sortParam = currentSortDirection !== "default" ? `&sortDirection=${currentSortDirection}&sortBy=${currentSortBy}` : "";
        let url = query
            ? `http://localhost:8081/club/searchClubs?page=${page - 1}&size=${itemsPerPage}&query=${query}${sortParam}`
            : `http://localhost:8081/club/getClubIdsAndNames?page=${page - 1}&size=${itemsPerPage}${sortParam}`;

        axios.get(url)
            .then(response => {
                let clubs = response.data;
                totalClubsCount = response.data.totalElements;
                sortedClubs = [...clubs];
                loadPage(currentPage, sortedClubs, totalClubsCount);
            })
            .catch(error => console.error('Error:', error));
    }


    let formElement = document.getElementById('filter-clubs');
    formElement.addEventListener('change', function () {
        let selectedClubs = this.clubsFilter.value;
        if (selectedClubs === "allClubs") {
            document.getElementById("filters-clubs-page").style.display = "block";
            document.getElementById("sortOptions-clubs").value = "default";
            document.getElementById("searchBar-clubs").style.display = "block";
            let clubsContainer = document.getElementById("clubs-ul");
            clubsContainer.innerHTML = "";
            currentPage = 1;
            getClubs(currentPage);
        } else {
            document.getElementById("filters-clubs-page").style.display = "none";
            document.getElementById("sortOptions-clubs").value = "default";
            document.getElementById("searchBar-clubs").style.display = "none";
            let clubsContainer = document.getElementById("clubs-ul");
            clubsContainer.innerHTML = "";
            axios.get("http://localhost:3001/clubgame-mostappearedclubs")
                .then(response => {
                    let popularClubs = response.data;
                    let clubDetailsPromises = popularClubs.map(club =>
                        axios.get(`http://localhost:8081/club/getClubDetailsById/${club.club_id}`)
                            .then(detailResponse => {
                                let clubDetails = detailResponse.data;
                                return {
                                    club_id: clubDetails.club_id,
                                    club_name: clubDetails.name
                                };
                            })
                            .catch(error => {
                                console.error(`Error fetching details for club ID ${club.club_id}:`, error);
                                return null;
                            })
                    );

                    Promise.all(clubDetailsPromises)
                        .then(clubDetails => {
                            let validClubDetails = clubDetails.filter(detail => detail !== null);
                            sortedClubs = [...validClubDetails];
                            currentSortDirection = "default";
                            currentPage = 1;
                            loadPage(currentPage, sortedClubs, sortedClubs.length);
                        });
                })
                .catch(error => console.error('Error:', error));
        }

    });

    let searchBar = document.getElementById('searchBar-clubs');
    searchBar.addEventListener('input', function () {
        let query = searchBar.value.toLowerCase();
        if(query===""){
            currentPage = 1;
            getClubs(currentPage);
        }
        currentPage = 1;
        getClubs(currentPage, query);
    });


    // Code to set up event listeners and load the initial page of clubs
    let clubsLoaded = false;
    if (window.currentView === "clubs" && !clubsLoaded) {
        document.querySelector(`input[name="clubsFilter"][value="allClubs"]`).checked = true;
        clubsLoaded = true;
        getClubs();
        let logo = document.getElementById("logo-logo");
        if (logo) {
            logo.addEventListener("click", showHomePage);
        }

        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);
        let players = document.getElementById("player-navbar");
        players.addEventListener("click", showPlayersPage);
    }


}