document.addEventListener('DOMContentLoaded', function() {
    // Accessibility Settings Management
    const accessibilitySettings = {
        fontSize: 16,
        colorScheme: 'default',
        lineHeight: 1.5,
        textToSpeech: false,
        readingMask: false,
        dyslexiaFont: false,
        keyboardNav: false,
        focusHighlight: false,
        voiceCommands: false
    };

    // Dom Elements
    const fontSizeInput = document.getElementById('font-size');
    const colorSchemeSelect = document.getElementById('color-scheme');
    const lineHeightInput = document.getElementById('line-height');
    const textToSpeechCheckbox = document.getElementById('text-to-speech');
    const readingMaskCheckbox = document.getElementById('reading-mask');
    const dyslexiaFontCheckbox = document.getElementById('dyslexia-font');
    const keyboardNavCheckbox = document.getElementById('keyboard-nav');
    const focusHighlightCheckbox = document.getElementById('focus-highlight');
    const voiceCommandsCheckbox = document.getElementById('voice-commands');
    const saveSettingsButton = document.getElementById('save-accessibility-settings');

    // Load Saved Settings
    function loadSavedSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
        Object.keys(savedSettings).forEach(key => {
            accessibilitySettings[key] = savedSettings[key];
        });

        // Update form controls
        fontSizeInput.value = accessibilitySettings.fontSize;
        colorSchemeSelect.value = accessibilitySettings.colorScheme;
        lineHeightInput.value = accessibilitySettings.lineHeight;
        textToSpeechCheckbox.checked = accessibilitySettings.textToSpeech;
        readingMaskCheckbox.checked = accessibilitySettings.readingMask;
        dyslexiaFontCheckbox.checked = accessibilitySettings.dyslexiaFont;
        keyboardNavCheckbox.checked = accessibilitySettings.keyboardNav;
        focusHighlightCheckbox.checked = accessibilitySettings.focusHighlight;
        voiceCommandsCheckbox.checked = accessibilitySettings.voiceCommands;

        applyAccessibilitySettings();
    }

    // Apply Accessibility Settings
    function applyAccessibilitySettings() {
        // Update document styles
        document.documentElement.style.setProperty('--base-font-size', `${accessibilitySettings.fontSize}px`);
        document.documentElement.style.setProperty('--line-height', accessibilitySettings.lineHeight);

        // Color Scheme
        document.body.className = `color-scheme-${accessibilitySettings.colorScheme}`;

        // Text-to-Speech
        if (accessibilitySettings.textToSpeech) {
            initTextToSpeech();
        }

        // Reading Mask
        if (accessibilitySettings.readingMask) {
            initReadingMask();
        }

        // Dyslexia-Friendly Font
        document.body.classList.toggle('dyslexia-font', accessibilitySettings.dyslexiaFont);

        // Keyboard Navigation
        document.body.classList.toggle('enhanced-keyboard-nav', accessibilitySettings.keyboardNav);

        // Focus Highlighting
        document.body.classList.toggle('focus-highlight', accessibilitySettings.focusHighlight);

        // Voice Commands
        if (accessibilitySettings.voiceCommands) {
            initVoiceNavigation();
        }
    }

    // Text-to-Speech Initialization
    function initTextToSpeech() {
        if ('speechSynthesis' in window) {
            const elements = document.querySelectorAll('main p, main h1, main h2, main h3');
            elements.forEach(el => {
                el.addEventListener('click', () => {
                    const utterance = new SpeechSynthesisUtterance(el.textContent);
                    window.speechSynthesis.speak(utterance);
                });
            });
        }
    }

    // Reading Mask Initialization
    function initReadingMask() {
        const readingMask = document.createElement('div');
        readingMask.id = 'reading-mask';
        document.body.appendChild(readingMask);

        document.addEventListener('mousemove', (e) => {
            readingMask.style.top = `${e.clientY - 50}px`;
        });
    }

    // Voice Navigation Initialization
    function initVoiceNavigation() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                
                // Simple voice commands
                const commands = {
                    'home': '/',
                    'dashboard': '/user-dashboard.html',
                    'accounts': '/account-integration.html',
                    'contact': '/contact.html'
                };

                if (commands[transcript]) {
                    window.location.href = commands[transcript];
                }
            };

            recognition.start();
        }
    }

    // Save Settings
    function saveSettings() {
        // Update settings object
        accessibilitySettings.fontSize = fontSizeInput.value;
        accessibilitySettings.colorScheme = colorSchemeSelect.value;
        accessibilitySettings.lineHeight = lineHeightInput.value;
        accessibilitySettings.textToSpeech = textToSpeechCheckbox.checked;
        accessibilitySettings.readingMask = readingMaskCheckbox.checked;
        accessibilitySettings.dyslexiaFont = dyslexiaFontCheckbox.checked;
        accessibilitySettings.keyboardNav = keyboardNavCheckbox.checked;
        accessibilitySettings.focusHighlight = focusHighlightCheckbox.checked;
        accessibilitySettings.voiceCommands = voiceCommandsCheckbox.checked;

        // Save to localStorage
        localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));

        // Apply settings
        applyAccessibilitySettings();

        // Show confirmation
        alert('Accessibility settings saved successfully!');
    }

    // Event Listeners
    saveSettingsButton.addEventListener('click', saveSettings);

    // Initial Load
    loadSavedSettings();
});