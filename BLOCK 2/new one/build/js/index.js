import { getCookie } from "./cookie.js"

let user_logged_in;

window.onload = function() {

    user_logged_in = getCookie('user')
}


function chooseDirection() {
    profileIcon.addEventListener('click', (e) => {

        if (user_logged_in != undefined) {
            window.location.replace("profile.html");
        } else {
            window.location.replace("register.html");
        }

    });

}

chooseDirection()