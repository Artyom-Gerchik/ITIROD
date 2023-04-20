import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { addVideoToStorage } from "./api/files.js"

const firebaseConfig = {
    apiKey: "AIzaSyAUqlkSTeBXhP4YlXnEQFGPRLzFac-zBdU",
    authDomain: "tubeyou-777.firebaseapp.com",
    projectId: "tubeyou-777",
    storageBucket: "tubeyou-777.appspot.com",
    messagingSenderId: "889609510856",
    appId: "1:889609510856:web:9ef4e4b15c3a1f732f6afd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


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
        .then(() => {
            console.log('OK')
        })
        .catch((error) => {
            alert(error)
        });
}

addVideoToDB();

export { addVideo }