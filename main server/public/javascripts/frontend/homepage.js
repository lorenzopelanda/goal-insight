let chatButton = document.getElementById("chat-button");
let openWindow = function () {
    window.open('http://localhost:3002/', '_blank');
};

/**
 * The setup function is responsible for setting up the homepage.
 * It includes functions to show different pages and event listeners for navigation.
 * It also removes the event listener for the chat button when navigating away from the homepage.
 */
export function setup() {

    /**
     * The showCompetitionsPage function is responsible for displaying the competitions page.
     * It changes the current view to 'competitions', hides the homepage, and loads the competitions module.
     */
    let showCompetitionsPage = () => {
        let competitionsPage = document.getElementsByClassName("competitionsPage")[0];
        window.currentView = "competitions";
        competitionsPage.classList.remove("hide");
        let homepage = document.getElementsByClassName("homepage-homepage")[0];
        homepage.classList.add("hide");
        let homepageBackgorund = document.getElementsByClassName("background-div-homepage")[0];
        homepageBackgorund.classList.add("hide");
        let chat = document.getElementsByClassName("chat-container")[0];
        chat.classList.add("hide");
        window.scrollTo(0, 0);
        chatButton.removeEventListener("click", openWindow);
        import("./competitions.js")
            .then(module => {
                module.competitions();
            });
    }

    /**
     * The showClubsPage function is responsible for displaying the clubs page.
     * It changes the current view to 'clubs', hides the homepage, and loads the clubs module.
     */
    let showClubsPage = () => {
        let clubsPage = document.getElementsByClassName("clubsPage")[0];
        window.currentView = "clubs";
        clubsPage.classList.remove("hide");
        let homepage = document.getElementsByClassName("homepage-homepage")[0];
        homepage.classList.add("hide");
        let homepageBackgorund = document.getElementsByClassName("background-div-homepage")[0];
        homepageBackgorund.classList.add("hide");
        let chat = document.getElementsByClassName("chat-container")[0];
        chat.classList.add("hide");
        window.scrollTo(0, 0);
        chatButton.removeEventListener("click", openWindow);
        import("./clubs.js")
            .then(module => {
                module.clubs();
            });
    }

    /**
     * The showPlayersPage function is responsible for displaying the players page.
     * It changes the current view to 'players', hides the homepage, and loads the players module.
     */
    let showPlayersPage = () => {
        let playersPage = document.getElementsByClassName("playersPage")[0];
        window.currentView = "players";
        playersPage.classList.remove("hide");
        let homepage = document.getElementsByClassName("homepage-homepage")[0];
        homepage.classList.add("hide");
        let homepageBackgorund = document.getElementsByClassName("background-div-homepage")[0];
        homepageBackgorund.classList.add("hide");
        let chat = document.getElementsByClassName("chat-container")[0];
        chat.classList.add("hide");
        window.scrollTo(0, 0);
        chatButton.removeEventListener("click", openWindow);
        import("./players.js")
            .then(module => {
                module.players();
            });
    }


    // If the current view is 'homepage', add event listeners for navigation and the chat button}
    if (window.currentView === "homepage") {
        let clubs = document.getElementById("club-navbar");
        clubs.addEventListener("click", showClubsPage);
        let competitions = document.getElementById("competition-navbar");
        competitions.addEventListener("click", showCompetitionsPage);
        let players = document.getElementById("player-navbar");
        players.addEventListener("click", showPlayersPage);

        if (chatButton) {
            chatButton.addEventListener("click", openWindow);
        }

    }

}