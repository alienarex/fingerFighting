function start() {
    setLogoInHeader();
    setBackgroundImagePage();
}

function setLogoInHeader() {
    document.getElementById('label-logo').style.content = "url('img/computer-144980_1280.png')";
}

function setBackgroundImagePage() {
    document.getElementById('content-wrapper').style.backgroundImage = "url('img/elegant-white-background-with-shiny-lines.jpg')";
}

window.addEventListener('load', start, false);
