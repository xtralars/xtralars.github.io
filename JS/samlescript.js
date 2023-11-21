import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import { getDatabase, set, ref, get, child } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbref = ref(db);
const storage = getStorage(app);

// Your Firebase configuration and initialization code (already provided)
let currentUserUsername;
let userUID;

// Sign up a user with email and password
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
// Function to register or log in and redirect
// Your existing code for authAndRedirect function
async function authFirebase(email, password, username, isRegister) {
  try {
    const authFunction = isRegister
      ? createUserWithEmailAndPassword(auth, email, password)
      : signInWithEmailAndPassword(auth, email, password);

    const userCredential = await authFunction;
    const user = userCredential.user;
    userUID = user.uid;
    currentUserUsername = user.username;
    
    

    if (isRegister) {
      // Additional registration logic if needed
      const userRef = child(dbref, `users/${user.uid}`);
      await set(userRef, { uid: user.uid, username }); // Store UID and username
    }

    // Registration/Login and data storage successful
    // Close the modal
    closeModal(isRegister ? 'registerModal' : 'signInModal');
    console.log(isRegister ? 'Registration successful!' : 'Login successful!');
    console.log(user);
    console.log(user.uid);
    console.log(currentUserUsername);

    // Display the username if the user is logged in
    if (!isRegister || user) {
      const userRef = child(dbref, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      currentUserUsername = userData.username;

      if (userData && userData.username) {
        // Display the username on the page
        document.getElementById('user-username').textContent = `Hei, ${userData.username}`;
        console.log(userData.username);
        currentUserUsername = userData.username;
        console.log(currentUserUsername);
        

        
      }
    }
  } catch (error) {
    console.error(isRegister ? 'Registration error:' : 'Login error:', error);
    
  }
}

// Event listener for both registration and login
function handleAuthButtonClick(isRegister) {
  const emailField = isRegister ? "email" : "login-email";
  const passwordField = isRegister ? "password" : "login-password";
  const usernameField = "username";

  const email = document.getElementById(emailField).value;
  const password = document.getElementById(passwordField).value;
  const username = isRegister ? document.getElementById(usernameField).value : null;

  // Call the auth and redirection function
  authFirebase(email, password, username, isRegister);
}

// Set up event listeners
document.getElementById("register-btn").addEventListener("click", () => {
  handleAuthButtonClick(true);
});

document.getElementById("login-btn").addEventListener("click", () => {
  handleAuthButtonClick(false);
});





const leaderboardRef = ref(db, 'leaderboard/');

function updateUserScore(points, currentUserUsername) {
  const userScoreRef = child(leaderboardRef, currentUserUsername);

  return get(userScoreRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // User already exists in the leaderboard, update the total score
        const currentScore = snapshot.val().score;
        return update(userScoreRef, { score: currentScore + points });
      } else {
        // User doesn't exist, create a new entry with total score
        return set(userScoreRef, { score: points });
      }
    })
    .catch((error) => {
      console.error("Error updating user score:", error);
      throw error;
    });
}



  
  
//////////////////////////////////////////////////////////////


function displayLeaderboard() {
    const leaderboardContainer = document.getElementById("leaderboardContainer");
  
    get(leaderboardRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Clear existing entries before updating
        leaderboardContainer.innerHTML = '';
  
        // Iterate through leaderboard entries and display them
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          const username = childSnapshot.key;
          const score = userData.score;
  
          const userEntry = document.createElement("div");
          userEntry.textContent = `${username}: ${score} poeng`;
          leaderboardContainer.appendChild(userEntry);
        });
      }
    });
  }
  
  // ...
  
  // Call this function to display the leaderboard
  displayLeaderboard();

  // OPPGAVER UNDER HER

  let correctAnswer;
  let userPoints = 3;
  let revealAnswer = null;
  
  // Function to update the content for a specific day
  
  
  // Loop through all 24 days to update the container
  
  // Function to update the content for the current day
  async function updateContentForCurrentDay() {
      const currentDate = new Date();
      const currentDay = currentDate.getDate(); // Get the current day of the month
  
      // Update the day number in the container's title
      document.getElementById("opgHead").textContent = `Luke ${currentDay}`;
  
      const dayRef = ref(db, `days/day${currentDay}`);
  
      const snapshot = await get(dayRef);
  
      if (snapshot.exists()) {
          const dayData = snapshot.val();
          document.getElementById("opgText").textContent = dayData.quizText;
          document.getElementById("hintText1").textContent = dayData.hints.hint1;
          document.getElementById("hintText2").innerHTML = dayData.hints.hint2;
          
          correctAnswer = dayData.correctAnswer;
          revealAnswer = dayData.revealAnswer;
  
          // Get the download URL for the audio file from Firebase Storage
          const audioFileRef = dayData.audioFileRef;
          const audioURL = await getDownloadURL(storageRef(storage, audioFileRef));
  
          const audioElement = document.getElementById("song");
          audioElement.src = audioURL;
          // Get fasit from database
          
          const videoContainer = document.getElementById("revealAnswer");
          videoContainer.src = revealAnswer;
          
          
  
  
         
  
  
          
      }
  }
  
  // Call the function to update content for the current day
  updateContentForCurrentDay();
  
  // Add this code at the beginning of the script to calculate yesterday's date
  
  
  // ...
  
 
  
  function checkGuess() {
      event.preventDefault();
      const inputGuess = document.querySelector('#guessInput').value.toLowerCase(); // Correct the querySelector and value access
      const message = document.querySelector('#message'); // Correct the querySelector
    
      if (inputGuess === correctAnswer.toLowerCase()) { // Compare user's input with the correct answer
        message.textContent = 'Gratulerer! ' + correctAnswer + ' er riktig.';
        triggerConfetti();
        revealAnswerToPage();
        updateUserScore(userPoints, currentUserUsername);
        displayLeaderboard();
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
    let hint1Used = false; // Flag to track if hint1 has been used
    let hint2Used = false; // Flag to track if hint2 has been used
   
    
    function updatePointsDisplay() {
      // Update UI to display the current user points
      document.getElementById("pointsDisplay").textContent = `Points: ${userPoints}`;
    }
    
    function revealHintText(hintTextElement) {
      // Display the hint text by removing the 'hidden' class
      hintTextElement.classList.remove("hidden");
    }
    
    function checkAndDeductPoints(hintUsedFlag) {
      // Check if the hint has already been used
      if (!hintUsedFlag && userPoints > 0) {
        userPoints -= 1;
        updatePointsDisplay();
        return true; // Deduction successful
      } 
      
      return false; // Deduction unsuccessful
    }
    
    hintBtn1.addEventListener("click", function () {
      if (checkAndDeductPoints(hint1Used)) {
        revealHintText(hintText1);
        hint1Used = true;
      }
    });
    
    hintBtn2.addEventListener("click", function () {
      if (checkAndDeductPoints(hint2Used)) {
        revealHintText(hintText2);
        hint2Used = true;
      }
    });
    
    const guessButton = document.querySelector("#submitGuess");
    guessButton.addEventListener("click", checkGuess);
  
    
    
    
    
  
    function revealAnswerToPage(){
      const videoContainer = document.getElementById("revealAnswer");
      if (revealAnswer){
        videoContainer.innerHTML = revealAnswer;
        videoContainer.style.display = 'block';
    } else{
        videoContainer.style.display = 'none';
    }
    }
  
  
  
  
  