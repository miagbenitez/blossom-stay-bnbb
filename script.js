const cards = document.querySelectorAll('.card');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const placeCards = document.querySelectorAll('.place-card');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modals = document.querySelectorAll('.modal-overlay');
const closeModalButtons = document.querySelectorAll('.close-modal');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
    card.style.transition = 'transform 0.2s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? '♥' : '♡';
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    placeCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.type === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

modalTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-overlay');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = '¡Listo!';
      submitButton.disabled = true;
      setTimeout(() => {
        submitButton.textContent = 'Entrar';
        submitButton.disabled = false;
      }, 1200);
    }
  });
});
