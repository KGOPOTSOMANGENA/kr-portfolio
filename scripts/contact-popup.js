document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("modalClose");
  const contactTriggers = document.querySelectorAll(".contact-btn, .contact-trigger");

  contactTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // stops it from navigating to contact.html
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // close if user clicks outside the box
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
});