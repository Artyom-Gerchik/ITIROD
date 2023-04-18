import { getCookie, deleteCookie } from "./cookie.js"
import { firebaseConfig, app, auth, database } from "./firebase_config.js"
import { updateUser } from "./CRUD_users.js"
import { addProfileImage } from "./api/files.js"

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

    if (user.user_name != undefined) {
        global_user = user;
    }
}

async function saveChanges() {
    global_user.user_name = document.getElementById("user_name").value;
    updateUser(global_user, user_logged_in);

    const file = document.getElementById('fileAvatar').files[0];

    if (file != undefined) {
        await addProfileImage(user_logged_in, file);
    }

    alert('Saved')
    window.location.reload();
}

saveButton.addEventListener('click', (e) => {
    saveChanges();
});