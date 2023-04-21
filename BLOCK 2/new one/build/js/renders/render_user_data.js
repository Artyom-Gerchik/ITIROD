async function get_user_data(userID) {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${userID}.json`);
    let user = await response.json();
    if (document.getElementById("user_name") != null) {
        document.getElementById("user_name").innerHTML = user.user_name;
        document.getElementById("user_name").placeholder = user.user_name;
    }
    if (document.getElementById("date_of_registration") != null) {
        document.getElementById("date_of_registration").innerHTML = user.date_of_registration;
    }
    if (document.getElementById("count_of_videos") != null) {
        document.getElementById("count_of_videos").innerHTML = user.count_of_videos;
    }
    if (document.getElementById("user_avatar") != null) {
        document.getElementById("user_avatar").src = user.avatar;
    }
    if (document.getElementById("user_avatar_header") != null) {
        document.getElementById("user_avatar_header").src = user.avatar;
    }

    if (user.user_name != undefined) {
        return user;
    }
}

export { get_user_data }