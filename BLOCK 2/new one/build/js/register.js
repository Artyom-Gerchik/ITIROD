import { setCookie } from "./cookie.js"
import { auth, database } from "./firebase_config.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {set, ref } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


async function register() {
    submitButton.addEventListener('click', (e) => {

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCookie('user', user.uid, 3);
                set(ref(database, 'users/' + user.uid), {
                        email: email,
                        password: password,
                        user_name: email,
                        date_of_registration: new Date().toUTCString().slice(5, 16),
                        count_of_videos: 0,
                        avatar: "",
                    })
                    .then(() => {
                        window.location.replace("index.html");
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                alert(errorMessage)
            });
    });
}

register()