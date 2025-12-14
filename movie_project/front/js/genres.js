document.querySelectorAll(".genre-scroll-btn--left").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".movie-detail__genres").querySelector(".genre-list").scrollBy({
      left: -180,
      behavior: "smooth",
    });
  });
});

document.querySelectorAll(".genre-scroll-btn--right").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".movie-detail__genres").querySelector(".genre-list").scrollBy({
      left: 180,
      behavior: "smooth",
    });
  });
});
