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

export { updateUser, getUserByID }