import { app } from "../firebase_config.js"
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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