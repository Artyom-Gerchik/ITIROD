async function getVideos() {
    const response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos.json`);
    return response.json();
}

async function getVideoByID(videoID) {
    const response = await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`);
    return response.json();
}

export { getVideos, getVideoByID }