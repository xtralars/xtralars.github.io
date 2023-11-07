import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getDatabase, set, ref, get, child } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';




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
const db = getDatabase();
const dbref = ref(db);

// Your Firebase configuration and initialization code (already provided)

// Sign up a user with email and password
function signUpWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  // Sign in a user with email and password
  function loginWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  // Function to close the modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  
  // Function to register and redirect
  function registerAndRedirect(email, password, username) {
    signUpWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
  
        // Store the username in the database
        const userRef = child(dbref, "users/" + user.uid);
        return set(userRef, { username });
      })
      .then(() => {
        // Registration and data storage successful
        // Close the registration modal
        closeModal('registerModal');
        // Redirect to the main page or any desired location
        window.location.href = 'index.html'; // Replace with your desired URL
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  }
  
  // Function to login and redirect
  function loginAndRedirect(email, password) {
    loginWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful
        // Redirect to the main page or any desired location
        window.location.href = 'index.html'; // Replace with your desired URL
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  }
  
  // Event listeners
  document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Call the registration and redirection function
    registerAndRedirect(email, password, username);
  });
  
  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    // Call the login and redirection function
    loginAndRedirect(email, password);
  });
  