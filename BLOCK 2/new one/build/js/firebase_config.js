import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAUqlkSTeBXhP4YlXnEQFGPRLzFac-zBdU",
    authDomain: "tubeyou-777.firebaseapp.com",
    projectId: "tubeyou-777",
    storageBucket: "tubeyou-777.appspot.com",
    messagingSenderId: "889609510856",
    appId: "1:889609510856:web:9ef4e4b15c3a1f732f6afd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { firebaseConfig, app, auth, database }