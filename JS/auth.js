import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

import { getStorage, ref } from "firebase/storage";


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
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);



// Your other JavaScript code here
// You can use `auth`, `createUserWithEmailAndPassword`, and `signInWithEmailAndPassword` as needed in this file.

// For example:
const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const signInButton = document.querySelector("#signInButton");
const signUpButton = document.querySelector("#signUpButton");
const leaderBoard = document.querySelector("#leaderboard_btn")



const userSignUp = async () => {
  const signUpEmail = registerEmail.value;
  const signUpPassword = registerPassword.value;

  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
};

const userSignIn = async () => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;

  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      // Handle user sign-in success
      window.location.href = 'index.html';
      
      alert('success');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle sign-in error
      alert('Wrong login');
    });
};

const checkAuthState = async{} => {
    onAuthStateChanged(auth, user => {
        if(user) {
            leaderBoard.style.display = 'block';
        }
        else{
            leaderBoard.style.display = 'none';
        }
    })
}

signInButton.addEventListener('click', userSignIn);
signUpButton.addEventListener('click', userSignUp);


