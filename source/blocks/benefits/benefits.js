const tooltipButton = document.querySelector('.benefits__tooltip-btn');
const tooltipContainer = document.querySelector('.benefits__tooltip-text');

const onButtonClick = (evt) => {
  evt.preventDefault();
  tooltipContainer.classList.toggle('active');
};

const addTooltip = () => {
  tooltipButton.addEventListener('click', onButtonClick);
};

document.addEventListener('click', (evt) => {
  if (!(evt.target === tooltipContainer) && !(evt.target === tooltipButton) && tooltipContainer.classList.contains('active')) {
    tooltipContainer.classList.remove('active');
  }
});

export {addTooltip};
