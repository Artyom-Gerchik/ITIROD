import { signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getCookie, deleteCookie } from "./cookie.js"
import { firebaseConfig, app, auth, database } from "./firebase_config.js"

let user_logged_in;

window.onload = function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }

    getUser();
}

async function getUser() {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await response.json();
    document.getElementById("user_name").innerHTML = user.user_name;
    document.getElementById("date_of_registration").innerHTML = user.date_of_registration;
    document.getElementById("count_of_videos").innerHTML = user.count_of_videos;
}

function logOut() {

    // const app = initializeApp(firebaseConfig);
    // const auth = getAuth(app);

    LogOutButton.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            deleteCookie();
        }).catch((error) => {
            console.log(error)
        });

    });
}

logOut()