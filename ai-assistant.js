document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');
    const voiceInputBtn = document.getElementById('voice-input-btn');
    const startVoiceAssistantBtn = document.getElementById('start-voice-assistant');
    const voiceStatus = document.getElementById('voice-status');

    // AI Assistant Knowledge Base
    const knowledgeBase = {
        'financial planning': 'Financial planning involves setting financial goals, creating strategies, and managing resources to achieve those goals.',
        'life insurance': 'Life insurance provides financial protection for your loved ones in case of your unexpected passing.',
        'medicare': 'Medicare is a federal health insurance program primarily for people 65 and older.',
        'investment': 'Investing involves allocating money into various assets with the expectation of generating income or profit.',
        'retirement savings': 'Retirement savings are funds set aside during your working years to support you financially after retirement.'
    };

    // Voice Recognition Setup
    let recognition = null;
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
    }

    // Text-to-Speech Setup
    function speakResponse(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    }

    // Add Message to Chat
    function addMessageToChat(message, sender = 'user') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `
            <strong>${sender === 'user' ? 'You' : 'AI Assistant'}:</strong>
            ${message}
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Speak response if from AI
        if (sender === 'ai') {
            speakResponse(message);
        }
    }

    // Generate AI Response
    function generateAIResponse(userMessage) {
        const lowercaseMessage = userMessage.toLowerCase();

        // Simple pattern matching
        for (let [key, response] of Object.entries(knowledgeBase)) {
            if (lowercaseMessage.includes(key)) {
                return response;
            }
        }

        // Default responses
        const defaultResponses = [
            'I can help you with financial inquiries. What would you like to know?',
            'Could you please rephrase your question about financial services?',
            'I specialize in financial advice. Ask me about insurance, investments, or planning.'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Send Message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessageToChat(message, 'user');
            const aiResponse = generateAIResponse(message);
            addMessageToChat(aiResponse, 'ai');
            userInput.value = '';
        }
    }

    // Voice Input
    function startVoiceInput() {
        if (recognition) {
            voiceStatus.textContent = 'Listening...';
            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
                voiceStatus.textContent = '';
                sendMessage();
            };

            recognition.onerror = (event) => {
                voiceStatus.textContent = 'Voice recognition error';
                console.error('Speech recognition error:', event.error);
            };

            recognition.onend = () => {
                voiceStatus.textContent = '';
            };
        } else {
            alert('Voice recognition not supported in this browser.');
        }
    }

    // Event Listeners
    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    voiceInputBtn.addEventListener('click', startVoiceInput);

    // Start Voice Assistant
    startVoiceAssistantBtn.addEventListener('click', () => {
        addMessageToChat('Hello! I\'m your AI financial assistant. How can I help you today?', 'ai');
    });
});
