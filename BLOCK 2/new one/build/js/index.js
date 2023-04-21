import { getCookie } from "./cookie.js"
import { getVideos } from "./api/videos.js"
import { renderVideos } from "./renders/render_videos.js"
import { get_user_data } from "./renders/render_user_data.js"

let user_logged_in;
let all_published_videos = [];

let left_bound = 0;
let right_bound = 4;
let right_bound_dup = 4;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in != undefined) {
        var global_user = await get_user_data(user_logged_in);
    }

    let all_videos = await getVideos();
    all_videos = Object.values(all_videos);

    all_videos.forEach(element => {
        if (element.is_published) {
            all_published_videos.push(element)
        }
    });

    renderVideos(all_published_videos, left_bound, right_bound);

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


    document.getElementById("rightButton").addEventListener('click', (e) => {

        if ((all_published_videos.length - right_bound) > right_bound) {
            left_bound += right_bound
            right_bound += right_bound;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(all_published_videos, left_bound, right_bound)
        } else if ((all_published_videos.length - right_bound) == 1) {
            left_bound = right_bound;
            right_bound += 1;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(all_published_videos, left_bound, right_bound)
        }
    });

    document.getElementById("leftButton").addEventListener('click', (e) => {

        if (left_bound != 0) {
            right_bound = left_bound;
            left_bound -= right_bound_dup;
            document.getElementById("videosWrapper").innerHTML = '';
            renderVideos(all_published_videos, left_bound, right_bound)
        }
    });

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