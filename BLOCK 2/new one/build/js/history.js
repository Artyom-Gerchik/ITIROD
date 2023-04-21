import { getVideos, getVideoByID } from "./api/videos.js"
import { getCookie, deleteCookie } from "./cookie.js"
import { getUserName, getUserByID } from "./CRUD_users.js"



let user_logged_in;
let user_history_videos = [];

let left_bound = 0;
let right_bound = 4;
let right_bound_dup = 4;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("signup.html");
    }

    if (window.sessionStorage.getItem("recently") != null) {
        var storedVideosId = JSON.parse(sessionStorage.getItem("recently"));

        let all_videos = await getVideos();
        all_videos = Object.values(all_videos);

        for (const video of all_videos) {
            for (const videoID of storedVideosId) {
                if (video.video_ID == videoID) {
                    user_history_videos.push(video);
                }
            }
        }

        console.log(user_history_videos)
    }

    document.getElementById("rightButton").addEventListener('click', (e) => {

        if ((user_history_videos.length - right_bound) > right_bound) {
            left_bound += right_bound
            right_bound += right_bound;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_history_videos)
        } else if ((user_history_videos.length - right_bound) == 1) {
            left_bound = right_bound;
            right_bound += 1;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_history_videos)
        }
    });

    document.getElementById("leftButton").addEventListener('click', (e) => {

        if (left_bound != 0) {
            right_bound = left_bound;
            left_bound -= right_bound_dup;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_history_videos)
        }
    });

    getUser();
}


async function getUser() {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await response.json();
    document.getElementById("user_avatar_header").src = user.avatar;

    renderVideos(user_history_videos);
}

async function renderVideos(videos) {
    console.log(left_bound)
    console.log(right_bound)
    var indexator = left_bound;
    for (indexator; indexator < right_bound; indexator++) {

        console.log(left_bound)
        console.log(right_bound)


        const video = videos[indexator]
        console.log(video)
        if (video != undefined) {
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
}

async function addEvent(videoID) {
    document.getElementById(videoID).addEventListener('click', (e) => {
        sessionStorage.setItem("videoID", videoID);
        window.location.replace("video.html");
    });
}