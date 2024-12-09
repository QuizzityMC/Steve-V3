/* scripts.js */

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    appendMessage('User', userInput);
    document.getElementById('user-input').value = '';

    // Fetch response from Hugging Face API
    const response = await getChatbotResponse(userInput);
    appendMessage('Bot', response);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender.toLowerCase());
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getChatbotResponse(message) {
    const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: message })
    });
    const data = await response.json();
    return data[0]?.generated_text || "Sorry, I didn't understand that.";
}
