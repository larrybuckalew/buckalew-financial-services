document.addEventListener('DOMContentLoaded', function() {
    // Support Request Form
    const supportRequestForm = document.getElementById('support-request-form');
    const liveChatModal = document.getElementById('live-chat-modal');
    const startLiveChatBtn = document.getElementById('start-live-chat');
    const closeChatModalBtn = document.querySelector('.close-modal');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatMessageInput = document.getElementById('chat-message-input');
    const sendChatMessageBtn = document.getElementById('send-chat-message');
    const scheduleConsultationBtn = document.getElementById('schedule-consultation');
    const viewFAQsBtn = document.getElementById('view-faqs');
    const emergencySupportBtn = document.getElementById('emergency-support');

    // Support Request Submission
    if (supportRequestForm) {
        supportRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                category: document.getElementById('support-category').value,
                message: document.getElementById('message').value
            };

            submitSupportRequest(formData);
        });
    }

    // Submit Support Request
    function submitSupportRequest(requestData) {
        fetch('/api/support-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Support request submitted successfully. We will contact you soon.');
            supportRequestForm.reset();
        })
        .catch(error => {
            showNotification('Failed to submit support request. Please try again.');
            console.error('Support request error:', error);
        });
    }

    // Live Chat Functionality
    if (startLiveChatBtn) {
        startLiveChatBtn.addEventListener('click', openLiveChat);
    }

    if (closeChatModalBtn) {
        closeChatModalBtn.addEventListener('click', closeLiveChat);
    }

    function openLiveChat() {
        liveChatModal.style.display = 'block';
        initializeChatSession();
    }

    function closeLiveChat() {
        liveChatModal.style.display = 'none';
        endChatSession();
    }

    function initializeChatSession() {
        // Simulate chat initialization
        addChatMessage('Support Bot', 'Hello! How can I assist you today?');
    }

    function endChatSession() {
        chatMessagesContainer.innerHTML = '';
    }

    // Send Chat Message
    if (sendChatMessageBtn) {
        sendChatMessageBtn.addEventListener('click', sendChatMessage);
    }

    if (chatMessageInput) {
        chatMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    function sendChatMessage() {
        const message = chatMessageInput.value.trim();
        if (message) {
            // Add user message
            addChatMessage('You', message);
            chatMessageInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponses = [
                    'Thank you for your message. Our team will review it shortly.',
                    'I understand your concern. Could you provide more details?',
                    'Let me help you find the right information.'
                ];
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addChatMessage('Support Bot', randomResponse);
            }, 1000);
        }
    }

    function addChatMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.classList.add(sender === 'You' ? 'user-message' : 'bot-message');
        messageElement.innerHTML = `
            <strong>${sender}:</strong> ${message}
        `;
        chatMessagesContainer.appendChild(messageElement);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    // Schedule Consultation
    if (scheduleConsultationBtn) {
        scheduleConsultationBtn.addEventListener('click', () => {
            window.location.href = '/consultation-booking.html';
        });
    }

    // View FAQs
    if (viewFAQsBtn) {
        viewFAQsBtn.addEventListener('click', () => {
            window.location.href = '/faqs.html';
        });
    }

    // Emergency Support
    if (emergencySupportBtn) {
        emergencySupportBtn.addEventListener('click', () => {
            showEmergencySupportModal();
        });
    }

    function showEmergencySupportModal() {
        const modal = document.createElement('div');
        modal.classList.add('emergency-modal');
        modal.innerHTML = `
            <div class="emergency-modal-content">
                <h2>Emergency Financial Support</h2>
                <p>If you are experiencing a financial crisis, please call our emergency helpline:</p>
                <p class="emergency-phone">1-800-FINANCIAL</p>
                <p>Our compassionate support team is available 24/7 to provide immediate assistance.</p>
                <button class="btn close-emergency-modal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModalBtn = modal.querySelector('.close-emergency-modal');
        closeModalBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    // Notification Function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
});