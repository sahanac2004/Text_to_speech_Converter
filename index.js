// Initialize speech synthesis
        let speech = new SpeechSynthesisUtterance();
        let voices = [];
        const voiceSelect = document.querySelector("select");
        const textArea = document.querySelector("textarea");
        const listenButton = document.querySelector("#listenButton");

        // Load available voices
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            speech.voice = voices[0]; // Default voice
            voices.forEach((voice, i) => {
                let option = new Option(voice.name + " (" + voice.lang + ")", i);
                voiceSelect.add(option);
            });
        };

        // Change voice based on selection
        voiceSelect.addEventListener("change", () => {
            speech.voice = voices[voiceSelect.value];
        });

        // Speak the text when clicking the "Listen" button
        listenButton.addEventListener("click", () => {
            const text = textArea.value.trim();
            if (text) {
                speech.text = text;
                window.speechSynthesis.speak(speech);
            } else {
                alert("Please enter some text to convert to speech.");
            }
        });

        // Handle speech synthesis errors
        speech.onerror = (event) => {
            console.error("Speech synthesis error:", event.error);
        };
