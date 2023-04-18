import { setCookie } from "./cookie.js"
import { firebaseConfig, app, auth, database } from "./firebase_config.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


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
                        console.log('user saved to db')
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

        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         // ...

        //         let isLogined = true;

        //         update(ref(database, 'users/' + user.uid), {
        //                 logged_in: isLogined
        //             })
        //             .then(() => {
        //                 console.log('user saved to db')
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             })

        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });


    });
}

register()