document.addEventListener("DOMContentLoaded", function () {
  // Loop through each product card
  document.querySelectorAll(".product-card").forEach(card => {
    const stars = card.querySelectorAll(".star");
    const ratingDisplay = card.querySelector(".rating-value");
    let currentRating = 0;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        currentRating = parseInt(star.getAttribute("data-value"));
        updateStars(stars, currentRating);
        ratingDisplay.textContent = `Rating: ${currentRating}`;
      });
    });

    function updateStars(stars, rating) {
      stars.forEach(star => {
        const value = parseInt(star.getAttribute("data-value"));
        if (value <= rating) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
    }
  });
});