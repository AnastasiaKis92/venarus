const link = document.querySelector('.production__link');
const popup = document.querySelector('.popup');
const popupButton = popup.querySelector('.popup__button');
const overlay = document.querySelector('.js-overlay-popup');

// Открытие/закрытие попап
const onTogglePopup = (evt) => {
  evt.preventDefault();
  popup.classList.toggle('active');
  overlay.classList.toggle('active');
  document.addEventListener('keydown', onPopupEscClose);
};

const togglePopup = () => {
  link.addEventListener('click', onTogglePopup);
  overlay.addEventListener('click', onTogglePopup);
  popupButton.addEventListener('click', onTogglePopup);
};

// Закрытие по ESC
function onPopupEscClose (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.removeEventListener('keydown', onPopupEscClose);
  }
}

export {togglePopup};
