import { getCookie } from "./cookie.js"
import { getVideos } from "./api/videos.js"
import { getUserName, getUserByID } from "./CRUD_users.js"


let user_logged_in;
let all_published_videos = [];


window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in != undefined) {
        getUser();
    }

    let all_videos = await getVideos();
    all_videos = Object.values(all_videos);

    all_videos.forEach(element => {
        if (element.is_published) {
            all_published_videos.push(element)
        }
    });

    renderVideos(all_published_videos);

    document.getElementById("searchButton").addEventListener('click', (e) => {
        document.getElementById("videosWrapper").innerHTML = '';
        let all_published_videos_filtered = [];
        let searchInputText = document.getElementById("serchInput").value;
        all_published_videos.forEach(element => {
            if (element.video_name.toLowerCase().includes(searchInputText.toLowerCase())) {
                all_published_videos_filtered.push(element);
            }
        });
        renderVideos(all_published_videos_filtered);
    });

}


async function renderVideos(videos) {
    for (const video of videos) {

        const user = await getUserByID(video.user_uploaded_ID);

        console.log(video.video_name)
        const fragment = document.createDocumentFragment();

        const div = fragment.appendChild(document.createElement("div"));
        div.setAttribute("class", "video-card");

        const input = div.appendChild(document.createElement("input"));
        input.setAttribute("type", "image");
        input.setAttribute("src", "./src/images/default_video_picture.png");
        input.setAttribute("class", "video-card__preview");
        input.setAttribute("id", video.video_ID);

        const p1 = div.appendChild(document.createElement("p"));
        p1.setAttribute("class", "for-video-card");
        p1.textContent = video.video_name;

        const p2 = div.appendChild(document.createElement("p"));
        p2.setAttribute("class", "for-video-card");
        p2.textContent = user.user_name;


        const p3 = div.appendChild(document.createElement("p"));
        p3.setAttribute("class", "for-video-card");
        p3.textContent = video.date_of_upload;


        const p4 = div.appendChild(document.createElement("p"));
        p4.setAttribute("class", "for-video-card-bottom");
        p4.textContent = video.count_of_views;

        document.getElementById("videosWrapper").appendChild(div);

        addEvent(video.video_ID);
    }
}

async function addEvent(videoID) {
    document.getElementById(videoID).addEventListener('click', (e) => {
        sessionStorage.setItem("videoID", videoID);
        window.location.replace("video.html");
    });
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