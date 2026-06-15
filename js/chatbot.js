/**
 * PARTH - AI Assistant Chatbot Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const fab = document.getElementById('chatbot-fab');
    const chatWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesContainer = document.getElementById('chat-messages');

    // Toggle Chat Window
    fab.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Handle Sending Messages
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Append User Message
        appendMessage(text, 'user-message');
        chatInput.value = '';

        // Simulate Bot Thinking & Response
        setTimeout(() => {
            const botReply = getBotResponse(text.toLowerCase());
            appendMessage(botReply, 'bot-message');
        }, 800);
    };

    // Send on Button Click or Enter Key
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Helper: Append Message to DOM
    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = text; // Allow basic HTML (like links) in bot responses
        messagesContainer.appendChild(msgDiv);
        
        // Auto-scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Basic Simulated AI Logic
    function getBotResponse(input) {
        if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
            return "Hello! How can I help you navigate Parth's portfolio today?";
        }
        if (input.includes('project')) {
            return "Parth has built some incredible AI/ML projects like the 'AI-Powered Data Analysis Dashboard' and 'Predictive Forecasting Model'. Check them out in the <a href='#projects' style='color:var(--primary); text-decoration:underline;'>Projects Section</a>.";
        }
        if (input.includes('contact') || input.includes('email')) {
            return "You can reach Parth at <b>parthdixit283@gmail.com</b> or give him a call at <b>+91 7404799410</b>. He's also on <a href='https://www.linkedin.com/in/parth-d09110' target='_blank' style='color:var(--primary);'>LinkedIn</a>!";
        }
        if (input.includes('resume') || input.includes('cv')) {
            return "You can download Parth's resume directly <a href='https://drive.google.com/file/d/1GJv-90UT-7rj08BYQ8LDGDd2xEi6b2Ed/view?usp=sharing' target='_blank' style='color:var(--primary); text-decoration:underline;'>here</a>.";
        }
        if (input.includes('skill') || input.includes('tech') || input.includes('stack')) {
            return "Parth specializes in Python, C++, SQL, PyTorch, TensorFlow, LLMs, and Data Visualization tools like PowerBI. See the full list in his <a href='#skills' style='color:var(--primary); text-decoration:underline;'>Skills Section</a>.";
        }
        if (input.includes('experience') || input.includes('work')) {
            return "Parth has great leadership experience as the Co-Head of Corporate & Alumni Relations at Dean Career Clouds and PR at Indian Blockchain Fraternity.";
        }

        // Default Fallback Response
        return "I'm still a simple bot! Try asking me about Parth's <b>projects</b>, <b>skills</b>, <b>experience</b>, or how to <b>contact</b> him.";
    }
});
