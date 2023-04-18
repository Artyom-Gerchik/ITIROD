function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var match = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]+)'));
    if (match) {
        return match[2];
    } else {
        console.log('--something went wrong---');
    }
}

function deleteCookie() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}


export { setCookie, getCookie, deleteCookie }