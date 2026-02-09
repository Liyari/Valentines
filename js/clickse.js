const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.5; // adjust volume

document.addEventListener("mousedown", (e) => {
if (e.target.closest(".icon") || e.target.closest(".modal")) {
  clickSound.currentTime = 0;
  clickSound.play();
}
});

document.addEventListener("mousedown", (e) => {
  // Clicks on icons or modal
  if (e.target.closest(".icon") || e.target.closest(".modal")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  // Clicks on openw-items (envelopes) or outside to close
  if (e.target.closest(".openw-item") || e.target.closest("#openwPopup")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
