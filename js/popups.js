const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const icons = document.querySelectorAll(".icon");

icons.forEach(icon => {
  icon.addEventListener("click", () => {

    /* icon3 → open game */
    if (icon.id === "icon3") {
      window.open("../Html/game.html", "_blank");
      return;
    }

    /* icon2 → Open When popup */
    if (icon.id === "icon2") {
      openwPopup.classList.add("show");
      openwPopup.classList.remove("text-mode");
      return;
    }

    /* icon1 & icon4 → image popup */
    const popupSrc = icon.dataset.popup;
    if (!popupSrc) return;

    modal.classList.remove("mode-icon1", "mode-icon4");
    modal.classList.add("show");

    if (icon.id === "icon1") modal.classList.add("mode-icon1");
    if (icon.id === "icon4") modal.classList.add("mode-icon4");

    modalImage.src = popupSrc;
    modalImage.style.display = "block";
  });
});

/* Close image modal */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeImageModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeImageModal();
    closeOpenWhen();
  }
});

function closeImageModal() {
  modal.classList.remove("show", "mode-icon1", "mode-icon4");
  modalImage.src = "";
  modalImage.style.display = "none";
}


/* ===============================
   OPEN WHEN POPUP (icon2)
================================ */
const openwPopup = document.getElementById("openwPopup");
const openwGrid = document.getElementById("openwGrid");
const openwText = document.getElementById("openwText");

/* Click envelope → show text */
openwGrid.addEventListener("click", (e) => {
  const item = e.target.closest(".openw-item");
  if (!item) return;

  openwText.textContent = item.dataset.text;
  openwPopup.classList.add("text-mode");
});

/* Click outside logic */
openwPopup.addEventListener("click", (e) => {
  if (e.target !== openwPopup) return;

  // If currently reading text → go back to grid
  if (openwPopup.classList.contains("text-mode")) {
    openwPopup.classList.remove("text-mode");
    openwText.textContent = "";
  } 
  // If already on grid → close popup
  else {
    closeOpenWhen();
  }
});

function closeOpenWhen() {
  openwPopup.classList.remove("show", "text-mode");
  openwText.textContent = "";
}

