import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { firebaseConfig, app, auth } from "./firebase_config.js"
import { addVideoToStorage } from "./api/files.js"


const database = getDatabase(app);

async function addVideo(userID, file) {
    let videoID = crypto.randomUUID();

    addVideoToStorage(videoID)

    set(ref(database, 'videos/' + videoID), {
            video_id: videoID,
            user_uploaded_id: userID,
        })
        .then(() => {})
        .catch((error) => {
            alert(error)
        })
}

export { addVideo }