import { setCookie } from "./cookie.js"
import { auth } from "./firebase_config.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


async function login() {
    submitButton.addEventListener('click', (e) => {

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCookie('user', user.uid, 3);
                window.location.replace("index.html");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                if (errorCode == 'auth/invalid-email') {
                    alert('Invalid email, brou')
                } else if (errorCode == 'auth/user-not-found') {
                    alert('No such account, brou')
                }
            });
    });
}

login()