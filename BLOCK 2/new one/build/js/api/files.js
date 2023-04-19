import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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

async function addProfileImage(userID, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `avatars/${userID}`);
    return await uploadBytes(storageRef, file);
}

async function addVideoToStorage(videoID, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `videos/${videoID}`);
    return await uploadBytes(storageRef, file);
}

export { addProfileImage, addVideoToStorage }