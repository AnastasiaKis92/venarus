const navContainer = document.querySelector('.nav');
const burgerButton = document.querySelector('.burger');
const burger = burgerButton.querySelector('.burger__inner');
const icons = [document.querySelector('.header__link--search'), document.querySelector('.header__link--info')];

const onButtonClick = (evt) => {
  evt.preventDefault();
  burger.classList.toggle('active');
  navContainer.classList.toggle('animate');
  document.body.classList.toggle('hidden');
  icons.forEach((icon) => {
    icon.classList.toggle('shown');
  });
};

const addBurger = () => {
  burgerButton.addEventListener('click', onButtonClick);
};

export {addBurger};
