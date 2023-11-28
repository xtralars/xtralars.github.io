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