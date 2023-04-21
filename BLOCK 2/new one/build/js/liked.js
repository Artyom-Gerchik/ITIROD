import { getVideos } from "./api/videos.js"
import { getCookie } from "./cookie.js"
import { renderVideos } from "./renders/render_videos.js"
import { get_user_data } from "./renders/render_user_data.js"


let user_logged_in;
let user_liked_videos = [];

let left_bound = 0;
let right_bound = 4;
let right_bound_dup = 4;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("register.html");
    }

    let all_videos = await getVideos();
    all_videos = Object.values(all_videos);

    for (const video of all_videos) {
        if (video.likes != undefined) {
            for (const like of video.likes) {
                user_liked_videos.push(video)
            }
        }
    }

    document.getElementById("rightButton").addEventListener('click', (e) => {

        if ((user_liked_videos.length - right_bound) > right_bound) {
            left_bound += right_bound
            right_bound += right_bound;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_liked_videos, left_bound, right_bound);
        } else if ((user_liked_videos.length - right_bound) == 1) {
            left_bound = right_bound;
            right_bound += 1;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_liked_videos, left_bound, right_bound);
        }
    });

    document.getElementById("leftButton").addEventListener('click', (e) => {

        if (left_bound != 0) {
            right_bound = left_bound;
            left_bound -= right_bound_dup;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(user_liked_videos, left_bound, right_bound);
        }
    });

    get_user_data(user_logged_in);
    renderVideos(user_liked_videos, left_bound, right_bound);
}