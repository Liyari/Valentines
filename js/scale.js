function scaleScene() {
  const scene = document.querySelector(".scene");

  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;

  const scale = Math.min(scaleX, scaleY);

  scene.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleScene);
window.addEventListener("load", scaleScene);