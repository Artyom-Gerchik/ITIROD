import { signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getCookie, deleteCookie } from "./cookie.js"
import { auth } from "./firebase_config.js"
import { getVideos } from "./api/videos.js"
import { get_user_data } from "./renders/render_user_data.js"
import { renderVideos } from "./renders/render_videos.js"

let user_logged_in;
let user_videos = [];
let global_user;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }

    let all_videos = await getVideos();
    all_videos = Object.values(all_videos);

    all_videos.forEach(element => {
        if (element.user_uploaded_ID == user_logged_in) {
            user_videos.push(element)
        }
    });

    global_user = await get_user_data(user_logged_in);

    renderVideos(user_videos, 0, user_videos.length + 1)

}

function logOut() {
    LogOutButton.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            deleteCookie();
        }).catch((error) => {
            console.log(error)
        });
    });
}

logOut()