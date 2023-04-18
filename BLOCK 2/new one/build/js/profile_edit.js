import { getCookie, deleteCookie } from "./cookie.js"

let user_logged_in;

window.onload = function() {

    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }
}