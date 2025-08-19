document.querySelectorAll('.stars').forEach(starContainer => {
  const rating = parseFloat(starContainer.dataset.rating);
  renderStars(starContainer, rating);

  starContainer.addEventListener('click', e => {
    if (e.target.classList.contains('star')) {
      const newRating = parseInt(e.target.dataset.value);
      starContainer.dataset.rating = newRating;
      renderStars(starContainer, newRating);
    }
  });
});

function renderStars(container, rating) {
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.innerHTML = i <= rating ? '★' : '☆';
    star.dataset.value = i;
    container.appendChild(star);
  }
}