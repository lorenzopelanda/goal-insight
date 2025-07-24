let name = null;
let roomName = null;
let chat = io.connect('/chat');
let chatSocketInitialized = false;
let userCounters = {};

/**
 * Event listener for the DOMContentLoaded event. Initializes the chat.
 */
document.addEventListener('DOMContentLoaded', function () {
    init();
    initChatSocket();
});

/**
 * Initializes the chat interface.
 */
function init() {
    document.getElementById('form_container').style.display = 'block';
    document.getElementById('message_container').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    const select = document.getElementById('competitionSelect');
    const userOnline = document.getElementById('userCountRooms');
    userOnline.innerHTML = '';
    select.innerHTML = '';

    const globalChatOption = document.createElement('option');
    globalChatOption.value = 'Global';
    globalChatOption.textContent = 'Global Chat';
    select.appendChild(globalChatOption);
    userOnline.innerHTML += `<span id="userCount_Global" style="display: none">Global CHAT:&nbsp;<span id="userCount_Global_value">0</span>`;
    let userElement = document.getElementById('userCount_Global');
    userElement.style.fontWeight = '400';
    userElement.style.fontFamily = 'Roboto';

    axios.get("http://localhost:8081/competition/getCompetitionIdsNamesCountries")
        .then(response => {
            response.data.forEach(competition => {
                const option = document.createElement('option');
                let competitionName = competition.name.split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                option.value = competitionName;
                option.textContent = competitionName + ' Chat';
                select.appendChild(option);

                userOnline.innerHTML += `<span id="userCount_${competitionName}" style="display: none">${competitionName} CHAT:&nbsp;<span id="userCount_${competitionName}_value">0</span>`;
                let userElement = document.getElementById('userCount_' + competitionName);
                userElement.style.fontWeight = '400';
                userElement.style.fontFamily = 'Roboto';
            });
            if (!document.querySelector('.online-users')) {
                userOnline.innerHTML += `&nbsp;<img class="online-users" src="images/user.svg">`;
            }
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('form-guest-btn').addEventListener('click', function (event) {
        event.preventDefault();
        let selectedOption = document.getElementById('competitionSelect').value;
        if (selectedOption) {
            roomName = selectedOption;
        } else {
            roomName = 'Global';
        }
    });

    select.addEventListener('change', function () {
        const selectedOptionText = this.selectedOptions[0].textContent;
        roomName = selectedOptionText;
    });
}

/**
 * Shows the login form.
 */
function showLoginForm() {
    let loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('click', function () {
        let elementsToHide = document.querySelectorAll('.form_container, .message_container');
        elementsToHide.forEach(function (element) {
            element.style.display = 'none';
        });
        loginForm.style.display = 'block';
    });
}

/**
 * Initializes the chat socket.
 */
function initChatSocket() {
    chat.on('update user count', function (room, count) {
        const userCountElement = document.getElementById('userCount_' + room + '_value');
        if (userCountElement) {
            userCountElement.textContent = count;
        } else {
            console.error(`Element with ID userCount_${room}_value not found.`);
        }
    });

    chat.on('joined', function (room, userId) {
        if (userId === name) {
            hideLoginInterface(roomName, userId);
        }
        writeOnChatHistory(userId, '<b>' + userId + '</b> joined the ' + room + ' Chat', false, true, false);

        if (!userCounters[room]) {
            userCounters[room] = document.getElementById('userCount_' + room + '_value');
        }

        if (userCounters[room]) {
            userCounters[room].textContent = parseInt(userCounters[room].textContent) + 1;
            document.getElementById('userCount_' + room).style.display = 'inline';
        } else {
            console.error(`Element with ID userCount_${room}_value not found.`);
        }
    });

    chat.on('chat', function (room, userId, chatText) {
        let who = userId;
        let isOwnMessage = (userId === name);
        if (isOwnMessage) who = 'Me';
        writeOnChatHistory(who, '<b>' + who + ':</b> ' + chatText, isOwnMessage, false, false);
    });

    chat.on('left', function (room, userId) {
        writeOnChatHistory(userId, '<b>' + userId + '</b> left the ' + room + ' Chat', false, false, true);

        if (userCounters[room]) {
            userCounters[room].textContent--;
            if (userCounters[room].textContent <= 0) {
                document.getElementById('userCount_' + room).style.display = 'none';
            }
        }
    });
}

/**
 * Sends the chat text to the server.
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    chat.emit('chat', roomName, name, chatText);
}
/**
 * Generates a random eight digit number.
 * @returns {number} A random eight digit number.
 */
function generateRandomEightDigitNumber() {
    return Math.floor(Math.random() * 90000000) + 10000000;
}
/**
 * Connects the user to a room.
 */
function connectToRoom() {
    roomName = document.getElementById('competitionSelect').value;
    name = document.getElementById('username').value;
    if (!name) name = 'Guest' + generateRandomEightDigitNumber();
    chat.emit('setUserId', name);
    chat.emit('create or join', roomName, name);
}

/**
 * Writes a message on the chat history.
 * @param {string} who - The sender of the message.
 * @param {string} text - The text of the message.
 * @param {boolean} [isOwnMessage=false] - Whether the message is sent by the current user.
 * @param {boolean} [isJoinMessage=false] - Whether the message is a join message.
 * @param {boolean} [isLeftMessage=false] - Whether the message is a left message.
 */
function writeOnChatHistory(who, text, isOwnMessage = false, isJoinMessage = false, isLeftMessage = false) {
    let history = document.getElementById('chat_history');
    let paragraph = document.createElement('p');
    let dateElement = document.createElement('span');
    paragraph.innerHTML = text;
    if (isOwnMessage) {
        paragraph.classList.add('own-message');
        dateElement.classList.add('own-message-dates');
    } else if (isJoinMessage) {
        paragraph.classList.add('join-message');
        dateElement.classList.add('join-message-dates');
    } else if (isLeftMessage) {
        paragraph.classList.add('left-message');
        dateElement.classList.add('left-message-dates');
    } else {
        paragraph.classList.add('other-message');
        dateElement.classList.add('other-message-dates');
    }
    let currentDate = new Date();

    let timeString = currentDate.toLocaleTimeString();

    dateElement.textContent = timeString;

    dateElement.classList.add("message-dates");

    history.appendChild(paragraph);
    history.appendChild(dateElement);
    dateElement.scrollIntoView({behavior: 'smooth', block: 'end'});
    document.getElementById('chat_input').value = '';
}

/**
 * Hides the login interface and shows the chat interface.
 * @param {string} room - The room the user joined.
 * @param {string} userId - The ID of the user.
 */
function hideLoginInterface(room, userId) {
    document.getElementById('form-guest').style.display = 'none';
    document.getElementById('message_container').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('competitionSelect').innerHTML = ' Chat';
}
/**
 * Event listener for the beforeunload event. Disconnects the user and resets the chat.
 */
window.addEventListener('beforeunload', function () {
    disconnectAndReset();
});

/**
 * Disconnects the user and resets the chat.
 */
function disconnectAndReset() {

    chat.emit('leave', roomName, name);
    name = null;
    roomName = null;

    document.getElementById('form-guest').style.display = 'block';
    document.getElementById('message_container').style.display = 'none';
    document.getElementById('chat_history').innerHTML = '';
    document.getElementById('username').value = '';
    document.getElementById('chat_input').value = '';

    if (chatSocketInitialized) {
        chat.disconnect();
        chatSocketInitialized = false;
    }

    init();

}





