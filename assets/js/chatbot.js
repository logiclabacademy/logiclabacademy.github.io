document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim(); // Get user input
    if (!userInput) return; // Prevent sending empty messages

    // Display user message in chat window
    displayMessage(userInput, 'user-message');
    
    // Clear the input field
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),  // Send user input to backend
        });

        const data = await response.json(); // Parse response from backend

        if (data.reply) {
            displayMessage(data.reply, 'bot-message'); // Display bot reply in chat window
        } else {
            displayMessage('Sorry, I did not get that. Please try again.', 'bot-message');
        }
    } catch (error) {
        displayMessage('Sorry, there was an error. Please try again later.', 'bot-message');
    }
}

function displayMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;  // Scroll to the bottom
}
