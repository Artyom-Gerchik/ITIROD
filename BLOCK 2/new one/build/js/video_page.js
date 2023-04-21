import { getVideoByID } from "./api/videos.js"
import { getCookie, deleteCookie } from "./cookie.js"
import { updateVideo } from "./CRUD_videos.js"
import { getUserName, getUserByID } from "./CRUD_users.js"

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
        await updateVideo(video, videoID);
    }

    await getValues();
    addComment(videoID);
}

async function getValues() {

    let user = await getUserByID(video.user_uploaded_ID);

    let userONPAGE = await getUserByID(user_logged_in);

    console.log(user)

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
    document.getElementById("user_avatar_header").src = userONPAGE.avatar;

    await renderComments();
    await renderPublishVideoButton();
}

async function addComment(videoID) {
    document.getElementById("commentPostButton").addEventListener('click', (e) => {
        let comment = document.getElementById("commentText").value;
        let comment_obj = {
            "user_ID": user_logged_in,
            "comment_text": comment,
            "date": new Date().toUTCString().slice(5, 16),
        }
        if (video.comments == undefined) {
            video.comments = [];
            video.comments.push(comment_obj);
        } else {
            video.comments.push(comment_obj);
        }
        video.count_of_comments += 1;

        document.getElementById("commentText").value = "";
        console.log(video);
        console.log(videoID);

        updateVideo(video, videoID);
    });
}

async function renderPublishVideoButton() {
    if (!video.is_published && video.user_uploaded_ID == user_logged_in) {

        const fragment = document.createDocumentFragment();

        const div = fragment.appendChild(document.createElement("div"));
        div.setAttribute("class", "main-content__container__buttons");

        const input = div.appendChild(document.createElement("input"));
        input.setAttribute("type", "button");
        input.setAttribute("value", "Publish");
        input.setAttribute("id", "publishButton");
        document.getElementById("contentInfo").appendChild(div);
        addEvent();
    }
}

async function addEvent() {
    document.getElementById("publishButton").addEventListener('click', (e) => {
        video.is_published = true;
        updateVideo(video, videoID);
        alert('PUBLISHED!')
        window.location.reload();
    });
}


async function renderComments() {
    if (video.comments != undefined) {
        for (const comment of video.comments) {
            const user = await getUserByID(comment.user_ID);

            const fragment = document.createDocumentFragment();

            const div = fragment.appendChild(document.createElement("div"));
            div.setAttribute("class", "comment-card");

            const p1 = div.appendChild(document.createElement("p"));
            p1.setAttribute("class", "for-comment-card");
            p1.textContent = user.user_name + ":";

            const p2 = div.appendChild(document.createElement("p"));
            p2.setAttribute("class", "for-comment-card");
            p2.textContent = comment.comment_text;

            const p3 = div.appendChild(document.createElement("p"));
            p3.setAttribute("class", "for-comment-card");
            p3.textContent = comment.date;

            document.getElementById("commentsWrapper").appendChild(div);
        }
    }
}