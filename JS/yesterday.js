import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, set, ref, get, child, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getStorage, getDownloadURL, ref as storageRef } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';



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
let correctAnswerYesterday;
let userPoints = 3;
let revealAnswerYesterday;

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day to get yesterday's date
const yesterday = currentDate.getDate();


// ...

// Function to update the content for yesterday
async function updateContentForYesterday() {
    
    const yesterdayRef = ref(db, `days/Day${yesterday}`);
    const snapshot = await get(yesterdayRef);

    if (snapshot.exists()) {
        const yesterdayData = snapshot.val();
        // Update the HTML elements with yesterday's content
        document.getElementById("opgHeadYesterday").textContent = `Fasit Luke ${yesterday}`;
        document.getElementById("opgTextYesterday").textContent = yesterdayData.quizText;
       
        document.getElementById("correctAnswerYesterday").innerHTML = yesterdayData.correctAnswer;
        // ...

        // Call additional functions to update points, hints, etc. if needed

        correctAnswerYesterday = yesterdayData.correctAnswer;
        revealAnswerYesterday = yesterdayData.revealAnswer;

        // Get the download URL for the audio file from Firebase Storage
        const audioFileRef = yesterdayData.audioFileRef;
        const audioURL = await getDownloadURL(storageRef(storage, audioFileRef));

        const audioElement = document.getElementById("songYesterday");
        audioElement.src = audioURL;
        // Get fasit from database
        
        const videoContainerYesterday = document.getElementById("revealAnswerYesterday");
        videoContainerYesterday.src = revealAnswerYesterday;

    }
}

// Call the function to update content for yesterday
updateContentForYesterday();

function revealAnswerToPageYesterday(){
    const videoContainer = document.getElementById("revealAnswerYesterday");
    let visFasit = document.getElementById("correctAnswerYesterday");
    if (revealAnswerYesterday){
      videoContainer.innerHTML = revealAnswerYesterday;
      visFasit.innerHTML = correctAnswerYesterday;
      videoContainer.style.display = 'block';
      visFasit.style.display = 'block';
  } else{
      videoContainer.style.display = 'none';
      visFasit.style.display = 'none';
  }
  }

  const visSvarKnapp = document.getElementById("visSvarBtn");
  visSvarKnapp.addEventListener('click', revealAnswerToPageYesterday);
