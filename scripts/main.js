const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  mainNav.classList.toggle('is-open', !isExpanded);
});

mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  }
});

const contactForm = document.querySelector('.contact-form');
const formMessage = contactForm.querySelector('.form-message');
const nameInput = contactForm.elements.name;
const phoneInput = contactForm.elements.phone;

const validateField = (input) => {
  const value = input.value.trim();
  let message = '';

  if (!value) {
    message = input.name === 'name' ? 'Укажите имя.' : 'Укажите номер телефона.';
  } else if (input.name === 'name' && value.length < 2) {
    message = 'Имя должно содержать не менее двух символов.';
  } else if (input.name === 'phone') {
    if (!/^\+?[\d\s().-]+$/.test(value)) {
      message = 'Проверьте номер: используйте цифры, +, скобки или дефис.';
    } else {
      const digits = value.replace(/\D/g, '');
      const validLength = digits.length === 10 || (digits.length === 11 && /^[78]/.test(digits));
      if (!validLength) message = 'Введите номер из 10 цифр или российский номер с +7/8.';
    }
  }

  input.setAttribute('aria-invalid', String(Boolean(message)));
  contactForm.querySelector(`#${input.name}-error`).textContent = message;
  return !message;
};

[nameInput, phoneInput].forEach((input) => {
  input.addEventListener('blur', () => {
    input.dataset.touched = 'true';
    validateField(input);
  });
  input.addEventListener('input', () => {
    formMessage.textContent = '';
    if (input.dataset.touched) validateField(input);
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  const fieldsAreValid = [nameInput, phoneInput].map(validateField).every(Boolean);
  if (!fieldsAreValid) {
    contactForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  formMessage.textContent = 'Спасибо! Это демонстрационная форма, данные никуда не отправлены.';
  contactForm.reset();
  [nameInput, phoneInput].forEach((input) => {
    delete input.dataset.touched;
    input.setAttribute('aria-invalid', 'false');
    contactForm.querySelector(`#${input.name}-error`).textContent = '';
  });
});

const clinicSwiperElement = document.querySelector('.gallery-slider');
if (clinicSwiperElement && window.Swiper) {
  new Swiper(clinicSwiperElement, {
    slidesPerView: 1.65,
    spaceBetween: 14,
    loop: true,
    speed: 900,
    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: clinicSwiperElement.querySelector('.swiper-pagination'),
      clickable: true,
    },
    breakpoints: {
      761: { slidesPerView: 1.65 },
      0: { slidesPerView: 1.12, spaceBetween: 10 },
    },
  });
}
