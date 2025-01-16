const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const voiceSelect = document.getElementById("voiceSelect");
const error = document.querySelector('.error-para');

// Populate voice options
function populateVoices() {
    const voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;

    if (!speechSynth.speaking && !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        return;
    }

    error.textContent = "";
    const newUtter = new SpeechSynthesisUtterance(enteredText);

    const selectedVoice = voiceSelect.value;
    if (selectedVoice) {
        newUtter.voice = speechSynthesis.getVoices().find(voice => voice.name === selectedVoice);
    }

    speechSynth.speak(newUtter);
    convertBtn.textContent = "Sound is Playing...";

    newUtter.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };
});

clearBtn.addEventListener('click', () => {
    text.value = "";
    error.textContent = "";
});
