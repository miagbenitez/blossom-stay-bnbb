const cards = document.querySelectorAll('.card');
const favoriteButtons = document.querySelectorAll('.favorite-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const placeCards = document.querySelectorAll('.place-card');
const compareButtons = document.querySelectorAll('.compare-btn');
const mapPins = document.querySelectorAll('.map-pin');
const faqItems = document.querySelectorAll('.faq-item');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const adminTriggers = document.querySelectorAll('.admin-trigger');
const reserveButtons = document.querySelectorAll('.reserve-trigger');
const modals = document.querySelectorAll('.modal-overlay');
const closeModalButtons = document.querySelectorAll('.close-modal');
const searchForm = document.getElementById('searchForm');
const reservationModal = document.getElementById('reservationModal');
const priceFilter = document.getElementById('priceFilter');
const typeFilter = document.getElementById('typeFilter');
const guestFilter = document.getElementById('guestFilter');
const serviceFilter = document.getElementById('serviceFilter');
const compareList = document.getElementById('compareList');
const compareCount = document.getElementById('compareCount');
const signupForm = document.getElementById('signupForm');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminSection = document.getElementById('adminSection');
const registeredList = document.getElementById('registeredList');
const reservationList = document.getElementById('reservationList');
const logoutAdminButton = document.getElementById('logoutAdmin');
const calendarGrid = document.getElementById('calendarGrid');
const monthLabel = document.getElementById('monthLabel');
const bookingRange = document.getElementById('bookingRange');
const bookingPriceLabel = document.getElementById('bookingPriceLabel');
const bookingTotal = document.getElementById('bookingTotal');
const bookingDiscount = document.getElementById('bookingDiscount');
const bookingNights = document.getElementById('bookingNights');
const bookingSavings = document.getElementById('bookingSavings');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const ADMIN_USERS = [
  { user: 'Mia Benitez', password: 'blossom123' },
  { user: 'Nicol Nestto', password: 'blossom123' },
  { user: 'Acsa Goncalves', password: 'blossom123' },
  { user: 'Sonia Villalba', password: 'blossom123' },
  { user: 'Alfonso Fransisco', password: 'blossom123' }
];

const registeredUsers = JSON.parse(localStorage.getItem('blossomRegisteredUsers') || '[]');
const reservations = JSON.parse(localStorage.getItem('blossomReservations') || '[]');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = [];
let compareItems = [];
const nightlyRate = 120;
const multiNightDiscount = 0.1;

function updateComparePanel() {
  if (!compareList || !compareCount) return;

  compareCount.textContent = `${compareItems.length}/2`;

  if (compareItems.length === 0) {
    compareList.innerHTML = '<p>Seleccioná dos propiedades para comparar.</p>';
    return;
  }

  compareList.innerHTML = compareItems
    .map((item) => `
      <div class="compare-item">
        <div>
          <strong>${item.name}</strong>
          <small>${item.zone}</small>
        </div>
        <div class="compare-meta">
          <span>⭐ ${item.rating}</span>
          <span>USD ${item.price}</span>
        </div>
        <button type="button" aria-label="Quitar ${item.name}" data-remove="${item.name}">×</button>
      </div>
    `)
    .join('');

  compareList.querySelectorAll('button[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedName = button.dataset.remove;
      compareItems = compareItems.filter((item) => item.name !== selectedName);
      const card = document.querySelector(`.place-card[data-name="${selectedName}"]`);
      if (card) {
        const btn = card.querySelector('.compare-btn');
        btn?.classList.remove('active');
        btn.textContent = 'Comparar';
        card.classList.remove('is-compare');
      }
      updateComparePanel();
    });
  });
}

function updateCatalogVisibility() {
  const priceValue = priceFilter?.value || 'all';
  const typeValue = typeFilter?.value || 'all';
  const guestValue = guestFilter?.value || 'all';
  const serviceValue = serviceFilter?.value || 'all';

  placeCards.forEach((card) => {
    const price = Number(card.dataset.price || 0);
    const guests = Number(card.dataset.guests || 0);
    const cardType = card.dataset.type || '';
    const services = (card.dataset.services || '').split(',');
    const matchesPrice = priceValue === 'all' ||
      (priceValue === 'under-100' && price < 100) ||
      (priceValue === '100-150' && price >= 100 && price <= 150) ||
      (priceValue === 'over-150' && price > 150);
    const matchesType = typeValue === 'all' || cardType === typeValue;
    const matchesGuests = guestValue === 'all' ||
      (guestValue === '2' && guests <= 2) ||
      (guestValue === '4' && guests >= 3 && guests <= 4) ||
      (guestValue === '6' && guests >= 6);
    const matchesService = serviceValue === 'all' || services.includes(serviceValue);

    const visible = matchesPrice && matchesType && matchesGuests && matchesService;
    card.style.display = visible ? 'block' : 'none';
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function renderAdminLists() {
  if (!registeredList || !reservationList) return;

  if (registeredUsers.length === 0) {
    registeredList.innerHTML = '<li>No hay registros aún.</li>';
  } else {
    registeredList.innerHTML = registeredUsers
      .map((user) => `<li><strong>${user.name}</strong> · ${user.email}</li>`)
      .join('');
  }

  if (reservations.length === 0) {
    reservationList.innerHTML = '<li>No hay reservas aún.</li>';
  } else {
    reservationList.innerHTML = reservations
      .map((item) => `<li><strong>${item.name}</strong> · DNI ${item.dni} · ${item.hotel} · ${item.dates || 'Sin fechas'}</li>`)
      .join('');
  }
}

function showAdminPanel() {
  if (adminSection) {
    adminSection.classList.remove('hidden');
  }
}

function hideAdminPanel() {
  if (adminSection) {
    adminSection.classList.add('hidden');
  }
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
}

function updateBookingText() {
  if (!bookingRange) return;

  updateBookingPrice();

  if (selectedDates.length === 0) {
    bookingRange.textContent = 'Seleccioná fechas';
    return;
  }

  if (selectedDates.length === 1) {
    bookingRange.textContent = formatDate(selectedDates[0]);
    return;
  }

  const [start, end] = selectedDates.slice().sort((a, b) => a - b);
  bookingRange.textContent = `${formatDate(start)} - ${formatDate(end)}`;
}

function updateBookingPrice() {
  if (!bookingTotal || !bookingPriceLabel) return;

  const hasRange = selectedDates.length === 2;
  const [start, end] = selectedDates.slice().sort((a, b) => a - b);
  const nights = hasRange ? Math.round((end - start) / 86400000) : 0;
  const hasDiscount = nights >= 3;
  const subtotal = nights * nightlyRate;
  const savings = hasDiscount ? subtotal * multiNightDiscount : 0;
  const total = subtotal - savings;

  if (!hasRange || nights === 0) {
    bookingPriceLabel.textContent = 'Desde';
    bookingTotal.textContent = `USD ${nightlyRate} / noche`;
    bookingDiscount?.setAttribute('hidden', '');
    if (bookingNights) bookingNights.textContent = 'Seleccioná las fechas';
    bookingSavings?.setAttribute('hidden', '');
    return;
  }

  bookingPriceLabel.textContent = `Total por ${nights} ${nights === 1 ? 'noche' : 'noches'}`;
  bookingTotal.textContent = `USD ${total.toFixed(0)}`;
  if (bookingNights) bookingNights.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;

  if (hasDiscount) {
    if (bookingDiscount) {
      bookingDiscount.textContent = '10% de descuento aplicado';
      bookingDiscount.removeAttribute('hidden');
    }
    if (bookingSavings) {
      bookingSavings.textContent = `Ahorrás USD ${savings.toFixed(0)}`;
      bookingSavings.removeAttribute('hidden');
    }
  } else {
    bookingDiscount?.setAttribute('hidden', '');
    bookingSavings?.setAttribute('hidden', '');
  }
}

function renderCalendar() {
  if (!calendarGrid || !monthLabel) return;

  calendarGrid.innerHTML = '';

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  monthLabel.textContent = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(currentYear, currentMonth, 1));

  for (let i = 0; i < startDay; i += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const cell = document.createElement('button');
    cell.type = 'button';
    const date = new Date(currentYear, currentMonth, day);
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isSelected = selectedDates.some((selected) => selected.getTime() === normalizedDate.getTime());

    cell.className = 'calendar-day';
    if (isSelected) cell.classList.add('selected');

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.slice().sort((a, b) => a - b);
      if (normalizedDate > start && normalizedDate < end) {
        cell.classList.add('range');
      }
    }

    cell.textContent = day;
    cell.addEventListener('click', () => {
      if (selectedDates.length === 2) {
        selectedDates = [normalizedDate];
      } else {
        const existing = selectedDates.find((selected) => selected.getTime() === normalizedDate.getTime());
        if (existing) {
          selectedDates = selectedDates.filter((selected) => selected.getTime() !== normalizedDate.getTime());
        } else {
          selectedDates.push(normalizedDate);
        }
      }

      selectedDates.sort((a, b) => a - b);
      updateBookingText();
      renderCalendar();
    });

    calendarGrid.appendChild(cell);
  }
}

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

compareButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.place-card');
    const name = card?.querySelector('h3')?.textContent?.trim() || 'Propiedad';
    const price = Number(card?.dataset.price || 0);
    const rating = card?.dataset.rating || '4.8';
    const zone = card?.dataset.zone || 'Sin zona';

    const exists = compareItems.some((item) => item.name === name);
    if (exists) {
      compareItems = compareItems.filter((item) => item.name !== name);
      button.classList.remove('active');
      button.textContent = 'Comparar';
      card?.classList.remove('is-compare');
    } else if (compareItems.length < 2) {
      compareItems.push({ name, price, rating, zone });
      button.classList.add('active');
      button.textContent = 'Agregado';
      card?.classList.add('is-compare');
    }

    updateComparePanel();
  });
});

mapPins.forEach((pin) => {
  pin.addEventListener('click', () => {
    const targetId = pin.dataset.target;
    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    mapPins.forEach((item) => item.classList.toggle('active', item === pin));
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.classList.add('is-compare');

    setTimeout(() => {
      targetCard.classList.remove('is-compare');
    }, 1800);
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isOpen) {
      item.classList.add('active');
    }
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    if (typeFilter) {
      typeFilter.value = filter === 'all' ? 'all' : filter;
    }

    updateCatalogVisibility();
  });
});

[priceFilter, typeFilter, guestFilter, serviceFilter].forEach((select) => {
  select?.addEventListener('change', () => {
    const allFilterButtons = document.querySelectorAll('.filter-btn');
    const activeType = typeFilter?.value || 'all';
    allFilterButtons.forEach((button) => {
      const matches = button.dataset.filter === activeType;
      button.classList.toggle('active', activeType !== 'all' ? matches : button.dataset.filter === 'all');
    });

    updateCatalogVisibility();
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetPanel = button.dataset.tab;

    tabButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === targetPanel;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  });
});

modalTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    if (modalId) openModal(modalId);
  });
});

adminTriggers.forEach((button) => {
  button.addEventListener('click', () => {
    openModal('adminModal');
  });
});

reserveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal('reservationModal');
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

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const showcase = document.getElementById('showcase');
  if (showcase) {
    showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

placeCards.forEach((card) => {
  card.dataset.name = card.querySelector('h3')?.textContent?.trim() || 'Propiedad';
});

const comparePanel = document.getElementById('comparePanel');
if (comparePanel) {
  comparePanel.setAttribute('aria-live', 'polite');
}

signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);
  const newUser = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || '')
  };

  registeredUsers.push(newUser);
  localStorage.setItem('blossomRegisteredUsers', JSON.stringify(registeredUsers));
  renderAdminLists();
  signupForm.reset();

  const submitButton = signupForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = '¡Registrado!';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = 'Registrarme';
      submitButton.disabled = false;
      closeModal('signupModal');
    }, 1200);
  }
});

adminLoginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(adminLoginForm);
  const user = String(formData.get('adminUser') || '');
  const password = String(formData.get('adminPassword') || '');
  const isValid = ADMIN_USERS.some((entry) => entry.user === user && entry.password === password);

  if (isValid) {
    showAdminPanel();
    closeModal('adminModal');
    adminLoginForm.reset();
  } else {
    alert('Credenciales inválidas');
  }
});

reservationModal?.addEventListener('click', (event) => {
  if (event.target === reservationModal) {
    reservationModal.classList.add('hidden');
    reservationModal.setAttribute('aria-hidden', 'true');
  }
});

const reservationForm = document.getElementById('reservationForm');
reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(reservationForm);
  const booking = {
    name: String(formData.get('name') || ''),
    dni: String(formData.get('dni') || ''),
    cardNumber: String(formData.get('cardNumber') || ''),
    hotel: 'Casa Jardín Iguazú',
    dates: selectedDates.length > 0 ? `${selectedDates.map((d) => formatDate(d)).join(' - ')}` : 'Sin fechas seleccionadas'
  };

  reservations.push(booking);
  localStorage.setItem('blossomReservations', JSON.stringify(reservations));
  renderAdminLists();

  const submitButton = reservationForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = '¡Reservado!';
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = 'Confirmar reserva';
      submitButton.disabled = false;
      reservationForm.reset();
      closeModal('reservationModal');
    }, 1400);
  }
});

logoutAdminButton?.addEventListener('click', () => {
  hideAdminPanel();
});

prevMonthBtn?.addEventListener('click', () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  renderCalendar();
});

nextMonthBtn?.addEventListener('click', () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  renderCalendar();
});

renderAdminLists();
hideAdminPanel();
renderCalendar();
updateBookingText();
updateCatalogVisibility();
updateComparePanel();