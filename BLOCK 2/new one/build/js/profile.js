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
    document.getElementById("user_avatar").src = user.avatar;
    document.getElementById("user_avatar_header").src = user.avatar;

    renderVideos();
}

function renderVideos() {
    const fragment = document.createDocumentFragment();

    const div = fragment.appendChild(document.createElement("div"));
    div.setAttribute("class", "video-card");

    const input = div.appendChild(document.createElement("input"));
    input.setAttribute("type", "image");
    input.setAttribute("src", "./src/images/default_video_picture.jpg");
    input.setAttribute("onclick", "location.href='index.html';");
    input.setAttribute("class", "video-card__preview");

    const p1 = div.appendChild(document.createElement("p"));
    p1.setAttribute("class", "p-for-video-card");
    p1.textContent = "userName";

    const p2 = div.appendChild(document.createElement("p"));
    p2.setAttribute("class", "p-for-video-card");
    p2.textContent = "userName";

    const p3 = div.appendChild(document.createElement("p"));
    p3.setAttribute("class", "p-for-video-card");
    p3.textContent = "userName";

    const p4 = div.appendChild(document.createElement("p"));
    p4.setAttribute("class", "p-for-video-card-bottom");
    p4.textContent = "userName";


    document.getElementById("videosWrapper").appendChild(div);
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