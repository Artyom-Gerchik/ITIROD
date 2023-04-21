async function updateVideo(video, videoID) {
    return await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`, {
        method: 'put',
        body: JSON.stringify(video),
    });
}

async function deleteVideo(videoID) {
    return await fetch(`https://tubeyou-777-default-rtdb.firebaseio.com/videos/${videoID}.json`, {
        method: 'delete',
        body: JSON.stringify(video),
    });
}

export { updateVideo, deleteVideo }