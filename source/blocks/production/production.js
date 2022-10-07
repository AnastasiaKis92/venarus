import Swiper, { Navigation} from 'swiper';

// const slider = document.querySelectorAll('.promo__slide');
// const sliderData = Array.from(slider);
// const title = document.querySelector('.promo__title');
// const text = document.querySelector('.promo__text');
// const sliderDescr = [title, text];
console.log(true);

new Swiper('.production__slider', {
  modules: [Navigation],
  // direction: 'horizontal',
  // loop: true,
  // watchSlidesProgress: true,
  speed: 700,
  slideToClickedSlide: true,
  grabCursor: true,
  // centeredSlides: true,
  // slidesPerView: 1,

  // autoplay: {
  //   delay: 1200,
  //   reverseDirection: true
  // },

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 130,
      // loop: true,

    }
  },

  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  //   renderBullet: function () {
  //     return '<button class="swiper-pagination-bullet"><span class="visually-hidden">Кнопка Пролистать слайдер</span></button>';
  //   },
  // },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
console.log(true);

// const addSlider = () => {
//   promoSlider.on('transitionStart', function() {
//     // Переключение цвета
//     document.body.style.backgroundColor = sliderData[this.realIndex].dataset.color;
//     document.body.style.transition = 'background-color 0.5s';
//     document.querySelector('.color').style.background = `linear-gradient(${sliderData[this.realIndex].dataset.color}, 30%, white)`;

//     // Анимация текста
//     sliderDescr.forEach((el) => {
//       el.style.transition = 'opacity 0.3s';
//       el.style.opacity = 0;
//       setTimeout(() => {
//         el.style.opacity = 1;
//         text.innerHTML = sliderData[this.realIndex].dataset.text;
//         title.innerHTML = sliderData[this.realIndex].dataset.title;
//       }, 300);
//     });
//   });
// };

// export {addSlider};
