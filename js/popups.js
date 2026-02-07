const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const icons = document.querySelectorAll(".icon");

icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const popupSrc = icon.dataset.popup;
    if (!popupSrc) return;

    modalImage.src = popupSrc;
    modalImage.style.display = "block"; // show image
    modal.classList.add("show");
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modalImage.style.display = "none"; // hide image
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("show");
    modalImage.src = "";
  }
});
