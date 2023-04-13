// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { setCookie } from "./cookie.js"


async function register() {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
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

    submitButton.addEventListener('click', (e) => {

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCookie('user', user.uid, 3);
                window.location.replace("index.html");
                //console.log(getCookie('user'));
                set(ref(database, 'users/' + user.uid), {
                        email: email,
                        password: password
                    })
                    .then(() => {
                        console.log('user saved to db')
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

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...

                let isLogined = true;

                update(ref(database, 'users/' + user.uid), {
                        logged_in: isLogined
                    })
                    .then(() => {
                        console.log('user saved to db')
                    })
                    .catch((error) => {
                        alert(error)
                    })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });


    });
}



// async function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }


register()