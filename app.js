import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { getDownloadURL, ref as storageRef } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';

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

// Function to update the content for a specific day


// Loop through all 24 days to update the container

// Function to update the content for the current day
async function updateContentForCurrentDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Get the current day of the month

    // Update the day number in the container's title
    document.getElementById("day-title").textContent = `Day ${currentDay}`;

    const dayRef = ref(db, `days/day${currentDay}`);

    const snapshot = await get(dayRef);

    if (snapshot.exists()) {
        const dayData = snapshot.val();
        document.getElementById("quizText").textContent = dayData.quizText;
        document.getElementById("hint1").textContent = dayData.hints.hint1;
        document.getElementById("hint2").textContent = dayData.hints.hint2;
        document.getElementById("correctAnswer").textContent = dayData.correctAnswer;

        // Get the download URL for the audio file from Firebase Storage
        const audioFileRef = dayData.audioFileRef;
        const audioURL = await getDownloadURL(storageRef(app, audioFileRef));

        const audioElement = document.getElementById("audioSource");
        audioElement.src = audioURL;
    }
}

// Call the function to update content for the current day
updateContentForCurrentDay();