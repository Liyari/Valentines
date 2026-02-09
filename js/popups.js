const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const icons = document.querySelectorAll(".icon");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    if (icon.id === "icon3") {
      window.open("../Html/game.html", "_blank");
      return; 
    }

    const popupSrc = icon.dataset.popup;
    if (!popupSrc) return;

    modal.classList.remove("mode-icon1", "mode-icon4");
    modal.classList.add("show");

    if (icon.id === "icon1") modal.classList.add("mode-icon1");
    if (icon.id === "icon4") modal.classList.add("mode-icon4");

    modalImage.src = popupSrc;
  });
});


modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("show", "mode-icon1", "mode-icon4");
  modalImage.src = ""; 
}
