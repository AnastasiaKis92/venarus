import Swiper, { Navigation} from 'swiper';

const initProductionSlider = () => new Swiper('.production__slider', {
  modules: [Navigation],
  speed: 700,
  slideToClickedSlide: true,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 130,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export {initProductionSlider};
