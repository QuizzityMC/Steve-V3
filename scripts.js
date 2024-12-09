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
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: { text: message } })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        // Access the generated text properly
        return data.conversation.generated_text || "Sorry, I didn't understand that.";
    } catch (error) {
        console.error('Error fetching response:', error);
        return "Sorry, something went wrong.";
    }
}
