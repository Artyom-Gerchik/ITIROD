import { getUserByID } from "../api/users.js"

async function renderVideos(videos, left_bound, right_bound) {
    var indexator = left_bound;
    for (indexator; indexator < right_bound; indexator++) {
        const video = videos[indexator]
        if (video != undefined) {
            const user = await getUserByID(video.user_uploaded_ID);
            const fragment = document.createDocumentFragment();

            const div = fragment.appendChild(document.createElement("div"));
            div.setAttribute("class", "video-card");

            const input = div.appendChild(document.createElement("input"));
            input.setAttribute("type", "image");
            input.setAttribute("src", "./src/images/default_video_picture.png");
            input.setAttribute("class", "video-card__preview");
            input.setAttribute("id", video.video_ID);

            const p1 = div.appendChild(document.createElement("p"));
            p1.setAttribute("class", "for-video-card");
            p1.textContent = video.video_name;

            const p2 = div.appendChild(document.createElement("p"));
            p2.setAttribute("class", "for-video-card");
            p2.textContent = user.user_name;


            const p3 = div.appendChild(document.createElement("p"));
            p3.setAttribute("class", "for-video-card");
            p3.textContent = video.date_of_upload;


            const p4 = div.appendChild(document.createElement("p"));
            p4.setAttribute("class", "for-video-card-bottom");
            p4.textContent = video.count_of_views;

            document.getElementById("videosWrapper").appendChild(div);

            addEvent(video.video_ID);
        }
    }
}

async function addEvent(videoID) {
    document.getElementById(videoID).addEventListener('click', (e) => {
        sessionStorage.setItem("videoID", videoID);
        window.location.replace("video.html");
    });
}

export { renderVideos }