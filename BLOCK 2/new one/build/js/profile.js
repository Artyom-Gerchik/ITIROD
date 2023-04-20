import { signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getCookie, deleteCookie } from "./cookie.js"
import { firebaseConfig, app, auth, database } from "./firebase_config.js"
import { getVideos } from "./api/videos.js"

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

    console.log(user_videos);

    getUser();
}

async function getUser() {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await response.json();
    document.getElementById("user_name").innerHTML = user.user_name;
    document.getElementById("date_of_registration").innerHTML = user.date_of_registration;
    document.getElementById("count_of_videos").innerHTML = user.count_of_videos;
    document.getElementById("user_avatar").src = user.avatar;
    document.getElementById("user_avatar_header").src = user.avatar;

    if (user.user_name != undefined) {
        global_user = user;
    }

    renderVideos();
}

function renderVideos() {
    user_videos.forEach(element => {
        const fragment = document.createDocumentFragment();

        const div = fragment.appendChild(document.createElement("div"));
        div.setAttribute("class", "video-card");

        const input = div.appendChild(document.createElement("input"));
        input.setAttribute("type", "image");
        input.setAttribute("src", "./src/images/default_video_picture.png");
        input.setAttribute("class", "video-card__preview");
        input.setAttribute("id", element.video_ID);

        const p1 = div.appendChild(document.createElement("p"));
        p1.setAttribute("class", "for-video-card");
        p1.textContent = element.video_name;

        const p2 = div.appendChild(document.createElement("p"));
        p2.setAttribute("class", "for-video-card");
        p2.textContent = global_user.user_name;

        const p3 = div.appendChild(document.createElement("p"));
        p3.setAttribute("class", "for-video-card");
        p3.textContent = element.date_of_upload;

        console.log(element.is_published)

        if (element.is_published == false) {
            const p4 = div.appendChild(document.createElement("p"));
            p4.setAttribute("class", "for-video-card-bottom");
            p4.textContent = "Not Published";
        } else {
            const p4 = div.appendChild(document.createElement("p"));
            p4.setAttribute("class", "for-video-card-bottom");
            p4.textContent = element.count_of_views;
        }

        document.getElementById("videosWrapper").appendChild(div);
        addEvent(element.video_ID);
    });
}

async function addEvent(videoID) {
    document.getElementById(videoID).addEventListener('click', (e) => {
        sessionStorage.setItem("videoID", videoID);
        window.location.replace("video.html");
    });
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