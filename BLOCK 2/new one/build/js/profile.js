import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getCookie, deleteCookie } from "./cookie.js"

let user_logged_in;

window.onload = function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }
}

function logOut() {

    const firebaseConfig = {
        apiKey: "AIzaSyAUqlkSTeBXhP4YlXnEQFGPRLzFac-zBdU",
        authDomain: "tubeyou-777.firebaseapp.com",
        projectId: "tubeyou-777",
        storageBucket: "tubeyou-777.appspot.com",
        messagingSenderId: "889609510856",
        appId: "1:889609510856:web:9ef4e4b15c3a1f732f6afd"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    LogOutButton.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            deleteCookie();
        }).catch((error) => {
            console.log(error)
        });

    });
}

logOut()