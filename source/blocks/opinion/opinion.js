import Swiper, { Pagination, Autoplay} from 'swiper';

const initOpinionSlider = () => new Swiper('.opinion__slider', {
  modules: [Pagination, Autoplay],
  speed: 700,
  slideToClickedSlide: true,
  centeredSlides: true,
  slidesPerView: 1,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function () {
      return '<button class="swiper-pagination-bullet"><span class="visually-hidden">Пролистать слайдер</span></button>';
    },
  },
});

export {initOpinionSlider};
