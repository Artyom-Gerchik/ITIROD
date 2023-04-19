import { getCookie } from "./cookie.js"

let user_logged_in;

window.onload = function() {

    user_logged_in = getCookie('user')
    if (user_logged_in != undefined) {
        getUser();
    }
}

async function getUser() {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await response.json();
    document.getElementById("user_avatar_header").src = user.avatar;
}

function chooseDirection() {
    user_avatar_header.addEventListener('click', (e) => {

        if (user_logged_in != undefined) {
            window.location.replace("profile.html");
        } else {
            window.location.replace("register.html");
        }

    });

}

chooseDirection()