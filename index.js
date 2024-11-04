// let speech = new SpeechSynthesisUtterance();
// let voices = [];
// let voiceSelect = document.querySelector("select");
// window.speechSynthesis.onvoiceschanged = () => {
// voices = window.speechSynthesis.getVoices();
// speech.voice = voices[0];

// voices.forEach((voice, i) => (voiceSelect.options[i] = new Option (voice. name, i)));
// };
// voiceSelect.addEventListener("change",()=>{
// speech.voice=voices[voiceSelect.value];
// });



// document.querySelector("button").addEventListener("click", () =>{
// speech.text = document.querySelector("textarea").value;
// window.speechSynthesis.speak(speech);
// });
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

// Draw waveform
function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const amplitude = 20; // Amplitude of the wave
    const frequency = 0.02; // Frequency of the wave

    ctx.beginPath();
    ctx.moveTo(0, centerY); // Start at the center

    for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency) * amplitude; // Sine wave formula
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#ff2963"; // Color of the waveform
    ctx.lineWidth = 2; // Width of the line
    ctx.stroke(); // Draw the line

    if (isSpeaking) {
        requestAnimationFrame(drawWaveform); // Continue drawing while speaking
    }
}

// Speak the text
document.querySelector("button").addEventListener("click", () => {
    speech.text = textArea.value;
    isSpeaking = true; // Set speaking state to true
    drawWaveform(); // Start drawing the waveform
    window.speechSynthesis.speak(speech);
});

// Stop drawing when speech ends
speech.onend = () => {
    isSpeaking = false; // Set speaking state to false
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas when done
};

// Handle speech synthesis errors
speech.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
};