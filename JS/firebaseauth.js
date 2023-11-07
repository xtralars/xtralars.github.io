import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getDatabase, set, ref, get, child } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbref = ref(db);
const storage = getStorage(app);

// Your Firebase configuration and initialization code (already provided)

// Sign up a user with email and password
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
// Function to register or log in and redirect
function authAndRedirect(email, password, username, isRegister) {
    let authFunction;
    let successMessage;
    let user; // Declare the user variable
  
    if (isRegister) {
      authFunction = createUserWithEmailAndPassword(auth, email, password);
      successMessage = "Registration successful!";
    } else {
      authFunction = signInWithEmailAndPassword(auth, email, password);
      successMessage = "Login successful!";
    }
  
    authFunction
      .then((userCredential) => {
        user = userCredential.user;
  
        if (isRegister) {
          // Store the username in the database
          const userRef = child(dbref, "users/" + user.uid);
          return set(userRef, { username });
        }
      })
      .then(() => {
        // Registration/Login and data storage successful
        // Close the modal
        closeModal(isRegister ? 'registerModal' : 'signInModal');
        // Redirect to the main page or any desired location
        window.location.href = 'index.html'; // Replace with your desired URL
        console.log(successMessage);
  
        // Display the username if the user is logged in
        if (!isRegister && user) {
          const userRef = child(dbref, "users/" + user.uid);
          get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.username) {
              // Display the username on the page
              document.getElementById("user-username").textContent = "Welcome, " + userData.username;
            }
          });
        }
      })
      .catch((error) => {
        console.error(isRegister ? "Registration error:" : "Login error:", error);
      });
  }
  
  // Event listeners for both registration and login
  document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Call the auth and redirection function for registration
    authAndRedirect(email, password, username, true);
  });
  
  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    // Call the auth and redirection function for login
    authAndRedirect(email, password, null, false);
  });
  