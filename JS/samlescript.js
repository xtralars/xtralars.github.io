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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbref = ref(db);
const storage = getStorage(app);

// Your Firebase configuration and initialization code (already provided)
let currentUserUsername;
let userUID;

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById('login_menu');
  const registerBtn = document.getElementById('register_menu');
  const logoutBtn = document.getElementById('logout-btn');
  const opgCard = document.getElementById('opgCard');
  const notLog = document.getElementById('notLog');

  if (user) {
    // User is signed in
    userUID = user.uid;

    const userRef = child(dbref, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      const userData = snapshot.val();
      currentUserUsername = userData ? userData.displayName : "Unknown User";
      document.getElementById('user-username').textContent = `Hei, ${currentUserUsername}`;
    });

    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    opgCard.style.display = 'block';
    notLog.style.display = 'none';

    updateContentForCurrentDay();
  } else {
    // User is signed out
    currentUserUsername = null;
    document.getElementById('user-username').textContent = 'Du er ikke logget inn';

    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    opgCard.style.display = 'none';
    notLog.style.display = 'block';
  }
});
function logout() {
  signOut(auth).then(() => {
    // Sign-out successful
    console.log('Logout successful!');
  }).catch((error) => {
    console.error('Logout error:', error);
  });
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Reset passord mail sendt!');
  } catch (error) {
    console.error('Password reset email error:', error);
    alert('Error sending password reset email. Please try again.');
  }
}
// Event listener for the "Forgot Password?" link
document.getElementById("resetPwrdLink").addEventListener("click", () => {
  const email = prompt("Skriv inn din epost:");
  if (email) {
    resetPassword(email);
  }
});

async function authFirebase(email, password, username, isRegister) {
  try {
    const authFunction = isRegister
      ? createUserWithEmailAndPassword(auth, email, password)
      : signInWithEmailAndPassword(auth, email, password);

      const userCredential = await authFunction;
      const user = userCredential.user;
      userUID = user.uid;
      currentUserUsername = user.displayName; // Corrected line
      
      if (isRegister) {
        // Additional registration logic if needed
        const userRef = child(dbref, `users/${user.uid}`);
        await set(userRef, { uid: user.uid, username, displayName: username }); // Store UID and username
        await updateProfile(user, { displayName: username });
      }

      

    

    // Registration/Login and data storage successful
    // Close the modal
    closeModal(isRegister ? 'registerModal' : 'signInModal');
    console.log(isRegister ? 'Registration successful!' : 'Login successful!');
    console.log(user);
    console.log(user.uid);
    console.log(currentUserUsername);
    console.log(userUID);
    if(isRegister){
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error(isRegister ? 'Registration error:' : 'Login error:', error);
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
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
document.getElementById("logout-btn").addEventListener("click", () => {
  logout();
});





const leaderboardRef = ref(db, 'leaderboard/');

function updateUserScore(userPoints, currentUserUsername) {
  const userScoreRef = child(leaderboardRef, currentUserUsername);

  return get(userScoreRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // User already exists in the leaderboard, update the total score
        const currentScore = snapshot.val().score;
        return update(userScoreRef, { score: currentScore + userPoints });
      } else {
        // User doesn't exist, create a new entry with total score
        return set(userScoreRef, { score: userPoints });
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

      // Create an array to store leaderboard entries
      const leaderboardEntries = [];

      // Iterate through leaderboard entries and push them to the array
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const username = childSnapshot.key;
        const score = userData.score;

        leaderboardEntries.push({ username, score });
      });

      // Sort the entries in descending order based on score
      leaderboardEntries.sort((a, b) => b.score - a.score);

      // Iterate through sorted leaderboard entries and display them with ranking numbers
      leaderboardEntries.forEach((entry, index) => {
        const userEntry = document.createElement("div");
        userEntry.textContent = `${index + 1}. ${entry.username}: ${entry.score} poeng`;
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
  let hasSubmittedCorrectAnswer = false;
  
  // Function to update the content for the current day
  async function updateContentForCurrentDay() {
    console.log("Updating content for the current day.");

    const userId = getUserId();
    console.log(userId);

    try {
        const alreadySubmitted = await checkServerForCorrectAnswer(userId);

        if (!alreadySubmitted) {
            await markUserAsNotSubmittedCorrectAnswer(userId);
            console.log('Value set to false');
        } else {
            console.log('Value not set to false');
        }

        proceedWithContentUpdate(userId);
    } catch (error) {
        console.error('Error in updateContentForCurrentDay:', error);
    }
}

async function proceedWithContentUpdate(userId) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Get the current day of the month
    markUserAsNotSubmittedCorrectAnswer(userId);

    // Update the day number in the container's title
    document.getElementById("opgHead").textContent = `Luke ${currentDay}`;

    const dayRef = ref(db, `days/Day${currentDay}`);
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

        // Get fasit from the database

        const videoContainer = document.getElementById("revealAnswer");
        videoContainer.src = revealAnswer;
    }
}

  // Call the function to update content for the current day
  
  
  // ...
  
  async function checkGuess() {
      event.preventDefault();
      const inputGuess = document.querySelector('#guessInput').value.toLowerCase();
      const message = document.querySelector('#message');
  
      // Assuming you have a user ID
      const userId = getUserId(); // Replace with your actual function to get the user ID
  
      try {
          // Check on the server if the user has already submitted a correct answer for the current day
          const alreadySubmitted = await checkServerForCorrectAnswer(userId);
  
          if (alreadySubmitted) {
              message.textContent = 'Du har allerede svart riktig i dag.';
          } else if (inputGuess === correctAnswer.toLowerCase()) {
              message.textContent = 'Gratulerer! ' + correctAnswer + ' er riktig.';
              triggerConfetti();
              revealAnswerToPage();
              updateUserScore(userPoints, currentUserUsername);
              displayLeaderboard();
              hasSubmittedCorrectAnswer = true;
  
              // Mark on the server that the user has submitted a correct answer for the current day
              markUserAsSubmittedCorrectAnswer(userId);
          } else {
              message.textContent = inputGuess + ' er feil. Prøv igjen.';
          }
          document.querySelector('#guessInput').value = '';
      } catch (error) {
          console.error("Error checking server:", error);
      }
  }
  
  // Dummy function, replace it with your actual function to get the user ID
  function getUserId() {
      // Assuming you have a user ID stored globally or retrieved from authentication
      return userUID;
  }
  
  const usersRef = ref(db, 'usersAnswer');
  
  async function checkServerForCorrectAnswer(userId) {
    try {
        const userSnapshot = await get(child(usersRef, userId));

        if (userSnapshot.exists()) {
            // Check if the user has submitted a correct answer
            const hasSubmittedCorrectAnswer = userSnapshot.val().hasSubmittedCorrectAnswer || false;
            console.log('hasSubmittedCorrectAnswer:', hasSubmittedCorrectAnswer);

            // Add this log for additional debugging
            console.log('userSnapshot.val():', userSnapshot.val());

            return hasSubmittedCorrectAnswer;
        }

        return false;
    } catch (error) {
        console.error('Error checking server:', error);
        throw error;
    }
}
  
  async function markUserAsSubmittedCorrectAnswer(userId) {
      try {
          // Mark the user as submitted a correct answer in the Realtime Database
          update(child(usersRef, userId), { hasSubmittedCorrectAnswer: true });
          console.log(`Marking user ${userId} as submitted a correct answer on the server.`);
      } catch (error) {
          console.error("Error marking user on the server:", error);
          throw error;
      }
  }
  async function markUserAsNotSubmittedCorrectAnswer(userId) {
    try {
        // Mark the user as not submitted a correct answer for the current day in the Realtime Database
        update(child(usersRef, userId), { hasSubmittedCorrectAnswer: false });
        console.log(`Marking user ${userId} as not submitted a correct answer on the server.`);
    } catch (error) {
        console.error("Error marking user on the server:", error);
        throw error;
    }
}

const resetKnapp = document.getElementById("testeReset");
resetKnapp.addEventListener("click", () => {
    const userId = getUserId();  // Replace with your actual function to get the user ID
    markUserAsNotSubmittedCorrectAnswer(userId);
});
  
    
    
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
  
  
  
  
  