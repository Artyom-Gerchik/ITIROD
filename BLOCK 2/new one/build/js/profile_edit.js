import { getCookie, deleteCookie } from "./cookie.js"
import { firebaseConfig, app, auth, database } from "./firebase_config.js"
import { updateUser } from "./CRUD_users.js"
import { addProfileImage, addVideoToStorage } from "./api/files.js"
import { addVideo } from "./add_video.js"

let user_logged_in;
let global_user;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }
    getValues();
}

async function getValues() {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`);
    let user = await response.json();
    document.getElementById("user_name").placeholder = user.user_name;
    document.getElementById("date_of_registration").innerHTML = user.date_of_registration;
    document.getElementById("count_of_videos").innerHTML = user.count_of_videos;
    document.getElementById("user_avatar").src = user.avatar;
    document.getElementById("user_avatar_header").src = user.avatar;

    if (user.user_name != undefined) {
        global_user = user;
    }
}

async function saveChanges() {
    if (document.getElementById("user_name").value != "") {
        global_user.user_name = document.getElementById("user_name").value;
    }
    global_user.avatar = `https://firebasestorage.googleapis.com/v0/b/tubeyou-777.appspot.com/o/avatars%2F${user_logged_in}?alt=media`;
    const avatar = document.getElementById('fileAvatar').files[0];
    const video = document.getElementById('fileVideo').files[0];
    console.log(video);


    if (avatar != undefined) {
        await addProfileImage(user_logged_in, avatar);
    }
    if (video != undefined) {
        await addVideo(user_logged_in, video);
    }

    updateUser(global_user, user_logged_in);

    alert('Saved')
    window.location.replace("profile.html");
}

saveButton.addEventListener('click', (e) => {
    saveChanges();
});