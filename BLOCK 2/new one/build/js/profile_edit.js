import { getCookie } from "./cookie.js"
import { updateUser } from "./api/users.js"
import { addProfileImage } from "./api/files.js"
import { addVideo } from "./api/videos.js"
import { get_user_data } from "./renders/render_user_data.js"


let user_logged_in;
let global_user;

window.onload = async function() {
    user_logged_in = getCookie('user')
    if (user_logged_in == undefined) {
        window.location.replace("index.html");
    }
    global_user = await get_user_data(user_logged_in);
}

async function saveChanges() {
    if (document.getElementById("user_name").value != "") {
        global_user.user_name = document.getElementById("user_name").value;
    }
    global_user.avatar = `https://firebasestorage.googleapis.com/v0/b/tubeyou-777.appspot.com/o/avatars%2F${user_logged_in}?alt=media`;
    const avatar = document.getElementById('fileAvatar').files[0];
    const video = document.getElementById('fileVideo').files[0];

    if (avatar != undefined) {
        await addProfileImage(user_logged_in, avatar);
    }
    if (video != undefined) {
        await addVideo(user_logged_in, video);
        global_user.count_of_videos += 1;
    }

    updateUser(global_user, user_logged_in);

    alert('Saved')
    window.location.replace("profile.html");
}

saveButton.addEventListener('click', (e) => {
    saveChanges();
});