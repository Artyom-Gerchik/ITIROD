async function updateUser(user, user_logged_in) {
    return await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${user_logged_in}.json`, {
        method: 'put',
        body: JSON.stringify(user),
    });
}

async function getUserByID(userID) {
    const response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${userID}.json`);
    return response.json();
}

async function getUserName(userID) {
    let response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/users/${userID}.json`);
    let user = await response.json();

    //console.log(user.user_name);
    return user.user_name;
}

export { updateUser, getUserName, getUserByID }