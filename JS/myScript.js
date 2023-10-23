//Dark Mode config//
function toggleDarkMode() {
  var body = document.body;
  var header = document.querySelector('header');
  var footer = document.querySelector('footer');
  
  
  body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");
  footer.classList.toggle("dark-mode");

};
document.getElementById("darkModeButton").addEventListener("click", toggleDarkMode);
//

// Get the modal
var modal = document.getElementById('signInModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
var modal = document.getElementById('registerModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Flipcard config Index//
const flipcard = document.querySelector('.flipcard_inner');

function flip() {
  flipcard.classList.toggle('is-flipped');
  flipcard.removeEventListener('click', flip);
}
// Prevent the page from refreshing when the button is clicked
const buttonInsideCard = flipcard.querySelector('button');
buttonInsideCard.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default behavior of the button
});

flipcard.addEventListener('click', flip);

// Add event listener to the flipcard_header
const flipcardHeader = document.querySelector('.flipcard_header');
flipcardHeader.addEventListener('click', flip);

//
//Flipcards config Tidligere
// Get all flip cards by their class
const flipcards = document.querySelectorAll('.flipcard_inner');

function flip(event) {
  const flipcard = event.currentTarget; // Get the clicked flip card
  flipcard.classList.toggle('is-flipped');
  flipcard.removeEventListener('click', flip)
}

// Add click event listeners to each flip card
flipcards.forEach(flipcard => {
  flipcard.addEventListener('click', flip);

  // Prevent the page from refreshing when the button is clicked
  const buttonInsideCard = flipcard.querySelector('button');
  buttonInsideCard.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the button
  });
});


// Audio player config//
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function(){
  progress.max = song.duration;
  progress.value = song.currentTime;
}
function playPause(){
  if(ctrlIcon.classList.contains("fa-pause")){
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
  else{
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

if(song.play()){
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}
progress.onchange = function(){
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}
//

var currentSong = "";

const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuess");
const message = document.getElementById("message");

submitGuessButton.addEventListener("click", checkGuess);

  
  function checkGuess() {
    const userGuess = guessInput.value.trim();
    
  
    if (userGuess.toLowerCase() === currentSong.toLowerCase()) {
        message.textContent = "Gratulerer! Du gjettet riktig!";
        resetGame();
    } else {
        message.textContent = "Det er dessverre feil. Prøv igjen.";
    }
  
    guessInput.value = "";
  }
  
  


//Content per day//

const contentForDays = {
  1: {
    header: "Day 1 Header",
    underheader: "Day 1 Underheader",
    opgText: "Dette er dag 1 sin oppgavetekst",
    audioSrc: "Resources/lofi1.mp3",
    frontside: "1",
    correctSong:"Test1",
    // Add other content properties here
  },
  2: {
    header: "Day 2 Header",
    underheader: "Day 2 Underheader",
    opgText: "Dette er dag 2 sin oppgavetekst",
    audioSrc: "Resources/Luke2.mp3",
    frontside: "2",
    correctSong: "Believer",
    // Add other content properties here
  },
  3: {
    header: "Day 3 Header",
    underheader: "Day 3 Underheader",
    opgText: "Dette er dag 3 sin oppgavetekst",
    audioSrc: "Resources/Luke3.mp3",
    frontside: "3",
    correctSong: "Sang3",
    // Add other content properties here
  },
  4: {
    header: "Day 4 Header",
    underheader: "Day 4 Underheader",
    opgText: "Dette er dag 4 sin oppgavetekst",
    audioSrc: "Resources/Luke3.mp3",
    frontside: "4",
    correctSong: "Sang4",
    // Add other content properties here
  },
  5: {
    header: "Day 5 Header",
    underheader: "Day 5 Underheader",
    opgText: "Dette er dag 5 sin oppgavetekst",
    audioSrc: "Resources/Luke2.mp3",
    frontside: "5",
    correctSong: "Sang5",
    // Add other content properties here
  },
  6: {
    header: "Day 6 Header",
    underheader: "Day 6 Underheader",
    opgText: "Dette er dag 6 sin oppgavetekst",
    audioSrc: "Resources/Luke6.mp3",
    frontside: "6",
    correctSong: "Sang6",
    // Add other content properties here
  },
  7: {
    header: "Day 6 Header",
    underheader: "Day 6 Underheader",
    opgText: "Dette er dag 6 sin oppgavetekst",
    audioSrc: "Resources/Luke6.mp3",
    frontside: "6",
    correctSong: "Sang6",
    // Add other content properties here
  },
  8: {
    header: "Day 6 Header",
    underheader: "Day 6 Underheader",
    opgText: "Dette er dag 6 sin oppgavetekst",
    audioSrc: "Resources/Luke6.mp3",
    frontside: "6",
    correctSong: "Sang6",
    // Add other content properties here
  },
  9: {
    header: "Day 9 Header",
    underheader: "Day 9 Underheader",
    opgText: "Dette er dag 9 sin oppgavetekst",
    audioSrc: "Resources/lofi1.mp3",
    frontside: "9",
    correctSong: "Sang9",
    // Add other content properties here
  },
  10: {
    header: "Day 10 Header",
    underheader: "Day 10 Underheader",
    opgText: "Dette er dag 10 sin oppgavetekst",
    audioSrc: "Resources/Luke6.mp3",
    frontside: "10",
    correctSong: "10",
    // Add other content properties here
  },
  // Continue for all 24 days
};
// Get the current date
const currentDate = new Date();

// Get the day of the month (1-31)
const dayOfMonth = currentDate.getDate();

// Get the main container element
const mainContainer = document.querySelector(".flipcard_content");
const frontContainer = document.querySelector(".frontside");

// Check if content exists for the current day
if (contentForDays[dayOfMonth]) {
  // Update the content of the main container based on the current day
  mainContainer.querySelector("h1").textContent = contentForDays[dayOfMonth].header;
  mainContainer.querySelector("h2").textContent = contentForDays[dayOfMonth].underheader;
  mainContainer.querySelector("p").textContent = contentForDays[dayOfMonth].opgText;
  frontContainer.querySelector("h3").textContent = contentForDays[dayOfMonth].frontside;
  currentSong = contentForDays[dayOfMonth].correctSong;

  const audioSource = mainContainer.querySelector("#audioSource");
  audioSource.src = contentForDays[dayOfMonth].audioSrc;

  // Load the updated audio source
  const audioElement = mainContainer.querySelector("#song");
  audioElement.load();
  // You can also play the audio automatically if desired:
  // audioElement.play();
  // Update audio source, input values, and other content properties as needed
} else {
  // Handle cases where there is no content for the current day
  console.log("No content available for today.");
}



//NY KODE HER

