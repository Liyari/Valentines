const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.5;

document.addEventListener("mousedown", (e) => {
    const clickableSelectors = [
        ".icon",
        ".modal",
        ".openw-item",
        "#openwPopup",
        ".menu-btn",
        "button"
    ];

    if (clickableSelectors.some(selector => e.target.closest(selector))) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
});
