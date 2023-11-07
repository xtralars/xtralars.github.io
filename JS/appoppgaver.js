import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { getStorage, getDownloadURL, ref as storageRef } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyDQ-BUlI7cl6aBT5VzE1furSpD7VqGs33c",
  authDomain: "musikkjulekalender2.firebaseapp.com",
  databaseURL: "https://musikkjulekalender2-default-rtdb.firebaseio.com",
  projectId: "musikkjulekalender2",
  storageBucket: "musikkjulekalender2.appspot.com",
  messagingSenderId: "1004475736728",
  appId: "1:1004475736728:web:b67098b5e004ce33e7e6ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
let correctAnswer;
// Function to update the content for a specific day


// Loop through all 24 days to update the container

// Function to update the content for the current day
async function updateContentForCurrentDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Get the current day of the month

    // Update the day number in the container's title
    document.getElementById("opgHead").textContent = `Day ${currentDay}`;

    const dayRef = ref(db, `days/day${currentDay}`);

    const snapshot = await get(dayRef);

    if (snapshot.exists()) {
        const dayData = snapshot.val();
        document.getElementById("opgText").textContent = dayData.quizText;
        document.getElementById("hintText1").textContent = dayData.hints.hint1;
        document.getElementById("hintText2").textContent = dayData.hints.hint2;
        
        correctAnswer = dayData.correctAnswer;

        // Get the download URL for the audio file from Firebase Storage
        const audioFileRef = dayData.audioFileRef;
        const audioURL = await getDownloadURL(storageRef(storage, audioFileRef));

        const audioElement = document.getElementById("song");
        audioElement.src = audioURL;
        // Get fasit from database
        const revealAnswer = dayData.revealAnswer;
        const videoContainer = document.getElementById("revealAnswer");

        if (revealAnswer){
            videoContainer.innerHTML = revealAnswer;
            videoContainer.style.display = 'block';
        } else{
            videoContainer.style.display = 'none';
        }


        
    }
}

// Call the function to update content for the current day
updateContentForCurrentDay();


function checkGuess() {
    event.preventDefault();
    const inputGuess = document.querySelector('#guessInput').value.toLowerCase(); // Correct the querySelector and value access
    const message = document.querySelector('#message'); // Correct the querySelector
  
    if (inputGuess === correctAnswer.toLowerCase()) { // Compare user's input with the correct answer
      message.textContent = 'Gratulerer! ' + correctAnswer + ' er riktig.';
    } else {
      message.textContent = inputGuess + ' er feil. Prøv igjen.';
    }
    document.querySelector('#guessInput').value = '';
  } 
  
  /*const guessButton = document.querySelector("#submitGuess");
  guessButton.addEventListener('click', checkGuess);*/
  
  
  let hintBtn1 = document.getElementById("hintBtn1");
  let hintBtn2 = document.getElementById("hintBtn2");
  let hintText1 = document.getElementById("hintText1");
  let hintText2 = document.getElementById("hintText2");
  let attempts = 0;
  const maxAttemptsToShowHint1 = 10;
  const maxAttemptsToShowHint2 = 20;
  
  function showHintButton(button) {
    button.style.display = "block";
  }
  
  function revealHintText(textElement) {
    textElement.classList.remove("hidden");
  }
  
  function incrementAttempts() {
    attempts++;
  
    if (attempts === maxAttemptsToShowHint1) {
      showHintButton(hintBtn1);
    }
  
    if (attempts === maxAttemptsToShowHint2) {
      showHintButton(hintBtn2);
    }
  
    checkGuess();
  }
  
  hintBtn1.addEventListener("click", function() {
    revealHintText(hintText1);
  });
  
  hintBtn2.addEventListener("click", function() {
    revealHintText(hintText2);
  });
  
  const guessButton = document.querySelector("#submitGuess");
  guessButton.addEventListener("click", incrementAttempts);
  
  
  
 /* let visHint1 = document.querySelector(".hidden1");
  let visHint2 = document.querySelector(".hidden2");
  
  function giveHint1(){
    visHint1.classList.toggle("hidden1");
    
  }
  function giveHint2(){
    visHint2.classList.toggle("hidden2");
    
  }
  
  const hintBtn1 = document.getElementById("hintBtn1");
  const hintBtn2 = document.getElementById("hintBtn2");
  
  hintBtn1.addEventListener('click', giveHint1);
  
  hintBtn2.addEventListener('click', giveHint2)*/