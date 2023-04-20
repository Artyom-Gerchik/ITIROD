import { getVideoByID } from "./api/videos.js"
import { getCookie, deleteCookie } from "./cookie.js"
import { updateVideo } from "./CRUD_videos.js"

let user_logged_in;
let videoID;
let video;

window.onload = async function() {
    user_logged_in = getCookie('user');
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }

    videoID = sessionStorage.getItem('videoID');
    video = await getVideoByID(videoID);

    if (video != undefined && video.is_published) {
        video.count_of_views += 1;
        updateVideo(video, videoID);
    }

    console.log(video)

    getValues();

}

async function getValues() {

    let user_response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await user_response.json();

    // let video_response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    // let video_object = await video_response.json();

    document.getElementById("video_name").textContent = video.video_name;
    document.getElementById("video_author").textContent = user.user_name;
    document.getElementById("date_of_upload").textContent = video.date_of_upload;
    document.getElementById("count_of_views").textContent = "Views: " + video.count_of_views;
    document.getElementById("count_of_likes").textContent = "Likes: " + video.count_of_likes;
    document.getElementById("count_of_dislikes").textContent = "DisLikes: " + video.count_of_dislikes;
    document.getElementById("count_of_comments").textContent = "Comments: " + video.count_of_comments;

    document.getElementById("videoFrame").src = `https://firebasestorage.googleapis.com/v0/b/tubeyou-777.appspot.com/o/videos%2F${videoID}?alt=media`
    document.getElementById("user_avatar_header").src = user.avatar;

}