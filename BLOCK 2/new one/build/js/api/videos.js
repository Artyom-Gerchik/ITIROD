import { addVideoToStorage } from "./files.js"
import { database } from "../firebase_config.js"
import {set, ref } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


async function getVideos() {
    const response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos.json`);
    return response.json();
}

async function getVideoByID(videoID) {
    const response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`);
    return response.json();
}

async function updateVideo(video, videoID) {
    return await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`, {
        method: 'put',
        body: JSON.stringify(video),
    });
}

async function deleteVideo(videoID) {
    return await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`, {
        method: 'delete',
    });
}

async function addVideo(userID, file) {
    let videoID = crypto.randomUUID();
    await addVideoToStorage(videoID, file);
    await addVideoToDB(userID, videoID, file.name);
}

async function addVideoToDB(userID, videoID, videoName) {
    set(ref(database, 'videos/' + videoID), {
            video_ID: videoID,
            user_uploaded_ID: userID,
            video_name: videoName,
            count_of_views: 0,
            count_of_likes: 0,
            count_of_dislikes: 0,
            count_of_comments: 0,
            date_of_upload: new Date().toUTCString().slice(5, 16),
            is_published: false,

        })
        .then(() => {})
        .catch((error) => {
            alert(error)
        });
}

addVideoToDB();

export { getVideos, getVideoByID, updateVideo, deleteVideo, addVideo }