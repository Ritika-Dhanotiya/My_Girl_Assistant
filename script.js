// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#listen-btn");
let voices = [];

// Load voices when available
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

// Function to convert text to speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Choose a female voice
  const femaleVoice = voices.find(voice => voice.name.includes("Google UK English Female") || voice.gender === "female");
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Attach click event listener to the button
btn.addEventListener("click", function () {
  // Function to handle recognized commands
  function handleCommand(command) {
    if (command.includes("open youtube")) {
      speak("Opening YouTube...");
      setTimeout(() => {
        window.open("https://www.youtube.com", "_blank");
      }, 500);
    } else if (command.includes("open google")) {
      speak("Opening Google...");
      setTimeout(() => {
        window.open("https://www.google.com", "_blank");
      }, 500);
    } else if (command.includes("open facebook")) {
      speak("Opening Facebook...");
      setTimeout(() => {
        window.open("https://www.facebook.com", "_blank");
      }, 500);
    } else if (command.includes("open instagram")) {
      speak("Opening Instagram...");
      setTimeout(() => {
        window.open("https://www.instagram.com", "_blank");
      }, 500);
    } else if (command.includes("open whatsapp")) {
      speak("Opening WhatsApp...");
      setTimeout(() => {
        window.open("https://www.whatsapp.com", "_blank");
      }, 500);
    } else {
      // Perform a Google search if command not recognized
      speak("Searching Google for " + command);
      setTimeout(() => {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(command)}`,
          "_blank"
        );
      }, 500);
    }
  }

  // Greet the user and then start listening
  speak("Hello, how can I help you?");
  
  // Delay to ensure greeting completes before starting recognition
  setTimeout(() => {
    btn.innerHTML = "Listening...👂";
    btn.classList.add("listening");
    recognition.start();
  }, 2500);

  // When a result is received
  recognition.onresult = (event) => {
    console.log(event);
    const command = event.results[0][0].transcript.toLowerCase();
    handleCommand(command);
  };

  // When recognition ends
  recognition.onend = () => {
    btn.innerHTML = "Start Listening";
    btn.classList.remove("listening");
  };
});
