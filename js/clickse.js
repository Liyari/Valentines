const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.5; // adjust volume

document.addEventListener("mousedown", (e) => {
if (e.target.closest(".icon") || e.target.closest(".modal")) {
  clickSound.currentTime = 0;
  clickSound.play();
}
});
