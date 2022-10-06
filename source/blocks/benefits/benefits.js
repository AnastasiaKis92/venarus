const tooltipButton = document.querySelector('.benefits__tooltip-btn');
const tooltipContainer = document.querySelector('.benefits__tooltip-text');

const onButtonClick = (evt) => {
  evt.preventDefault();
  tooltipContainer.classList.toggle('animate');
};

const addTooltip = () => {
  tooltipButton.addEventListener('click', onButtonClick);
};

export {addTooltip};
