import { getVideoByID } from "./api/videos.js"
import { getCookie, deleteCookie } from "./cookie.js"
import { updateVideo, deleteVideo } from "./CRUD_videos.js"
import { getUserName, getUserByID } from "./CRUD_users.js"

let user_logged_in;
let videoID;
let video;

window.onload = async function() {

    user_logged_in = getCookie('user');
    if (sessionStorage.getItem('videoID') != null) {
        if (user_logged_in == undefined) {
            document.getElementById("commentText").setAttribute("type", "hidden")
            document.getElementById("likeButton").setAttribute("type", "hidden")
            document.getElementById("disLikeButton").setAttribute("type", "hidden")
            document.getElementById("commentPostButton").setAttribute("hidden", "")
        }

        videoID = sessionStorage.getItem('videoID');
        video = await getVideoByID(videoID);

        if (video != undefined && video.is_published) {
            video.count_of_views += 1;
            await updateVideo(video, videoID);
        }

        if (video.likes != undefined) {
            video.likes.forEach(element => {
                console.log("1: " + element);
                if (element.user_ID == user_logged_in) {
                    document.getElementById("likeButton").setAttribute("type", "hidden")
                }
            });
        }

        if (video.disLikes != undefined) {
            video.disLikes.forEach(element => {
                console.log("2" + element);
                if (element.user_ID == user_logged_in) {
                    document.getElementById("disLikeButton").setAttribute("type", "hidden")
                }
            });
        }

        await getValues();
        addComment(videoID);
        addLike(videoID);
        addDisLike(videoID);

        if (window.sessionStorage.getItem("recently") == null) {
            var recently = [videoID];
            window.sessionStorage.setItem("recently", JSON.stringify(recently));
        } else {
            var storedArray = JSON.parse(sessionStorage.getItem("recently"));
            if (!storedArray.includes(videoID)) {
                storedArray.push(videoID);
                window.sessionStorage.setItem("recently", JSON.stringify(storedArray));
            }
        }
    } else {
        window.location.replace("index.html");
    }
}

async function getValues() {

    let user = await getUserByID(video.user_uploaded_ID);

    let userONPAGE = await getUserByID(user_logged_in);

    document.getElementById("video_name").textContent = video.video_name;
    document.getElementById("video_author").textContent = user.user_name;
    document.getElementById("date_of_upload").textContent = video.date_of_upload;
    document.getElementById("count_of_views").textContent = "Views: " + video.count_of_views;
    document.getElementById("count_of_likes").textContent = "Likes: " + video.count_of_likes;
    document.getElementById("count_of_dislikes").textContent = "DisLikes: " + video.count_of_dislikes;
    document.getElementById("count_of_comments").textContent = "Comments: " + video.count_of_comments;

    document.getElementById("videoFrame").src = `https://firebasestorage.googleapis.com/v0/b/tubeyou-777.appspot.com/o/videos%2F${videoID}?alt=media`
    if (user_logged_in != undefined) {
        document.getElementById("user_avatar_header").src = userONPAGE.avatar;
    }

    await renderComments();
    await renderPublishVideoButton();
    await renderDeleteVideoButton();
}

async function addLike(videoID) {
    document.getElementById("likeButton").addEventListener('click', (e) => {

        let like_obj = {
            "user_ID": user_logged_in,
        }
        if (video.likes == undefined) {
            video.likes = [];
            video.likes.push(like_obj);
        } else {
            video.likes.push(like_obj);
        }
        video.count_of_likes += 1;

        document.getElementById("likeButton").setAttribute("type", "hidden")
        document.getElementById("disLikeButton").setAttribute("type", "button")
        updateVideo(video, videoID);
        removeDisLike();
    });
}

async function addDisLike(videoID) {
    document.getElementById("disLikeButton").addEventListener('click', (e) => {

        let disLike_obj = {
            "user_ID": user_logged_in,
        }
        if (video.disLikes == undefined) {
            video.disLikes = [];
            video.disLikes.push(disLike_obj);
        } else {
            video.disLikes.push(disLike_obj);
        }

        video.count_of_dislikes += 1;

        console.log(video);

        document.getElementById("disLikeButton").setAttribute("type", "hidden")
        document.getElementById("likeButton").setAttribute("type", "button")
        updateVideo(video, videoID);
        removeLike();
    });
}

async function removeLike() {
    let likesArray = [];
    video.likes.forEach(element => {
        if (element.user_ID != user_logged_in) {
            likesArray.push(element)
        }
    });

    video.likes = likesArray;
    video.count_of_likes -= 1;

    updateVideo(video, videoID);
}

async function removeDisLike() {
    let disLikesArray = [];
    video.disLikes.forEach(element => {
        if (element.user_ID != user_logged_in) {
            disLikesArray.push(element)
        }
    });

    video.disLikes = disLikesArray;
    video.count_of_dislikes -= 1;

    updateVideo(video, videoID);
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

async function renderDeleteVideoButton() {
    if (video.user_uploaded_ID == user_logged_in) {

        const fragment = document.createDocumentFragment();

        const div = fragment.appendChild(document.createElement("div"));
        div.setAttribute("class", "main-content__container__buttons");

        const input = div.appendChild(document.createElement("input"));
        input.setAttribute("type", "button");
        input.setAttribute("value", "Delete");
        input.setAttribute("id", "deleteButton");
        document.getElementById("contentInfo").appendChild(div);
        addDeleteEvent();
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

async function addDeleteEvent() {
    document.getElementById("deleteButton").addEventListener('click', (e) => {
        deleteVideo(videoID);
        alert('DELETED!')
        window.location.replace("profile.html");
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