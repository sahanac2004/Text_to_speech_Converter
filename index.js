let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let textArea = document.querySelector("textarea");
let canvas = document.getElementById("waveform");
let ctx = canvas.getContext("2d");
let isSpeaking = false;

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

// Change voice when selected
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak the text
document.querySelector("button").addEventListener("click", () => {
    speech.text = textArea.value;
    isSpeaking = true; // Set speaking state to true
    drawWaveform(); // Start drawing the waveform
    window.speechSynthesis.speak(speech);
});


// Handle speech synthesis errors
speech.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
};
