const slider = document.querySelector('.results__slider');
const before = document.querySelector('.results__slider-img--before');
const after = document.querySelector('.results__slider-img--after');
const control = document.querySelector('.results__slider-control');

let isActive = false;

const sliderReset = () => {
  isActive = false;
  before.style.clipPath = `inset(0 50% 0 0)`;
  after.style.clipPath = `inset(0 0 0 50%)`;
  control.style.left = `50%`;
  before.style.transition = '0.3s'
  after.style.transition = '0.3s'
  control.style.transition = '0.3s'
};

const sliderChange = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.clipPath = `inset(0 ${slider.offsetWidth - shift}px 0 0)`;
  after.style.clipPath = `inset(0 0 0 ${shift}px)`;
  control.style.left = `${shift}px`;
};

const initSliderChange = (x) => {
  x -= slider.getBoundingClientRect().left;

  sliderChange(x);
};

const onSliderMouseMove = (evt) => {
  let x = evt.pageX;
  if (isActive) {
    before.style.transition = 'none'
    after.style.transition = 'none'
    control.style.transition = 'none'
    initSliderChange(x);
  }
};

const onSliderTouchMove = (evt) => {
  let x;

  for (let i = 0; i < evt.changedTouches.length; i++) {
    x = evt.changedTouches[i].pageX;
  }
  before.style.transition = 'none'
  after.style.transition = 'none'
  control.style.transition = 'none'
  initSliderChange(x);
};

const desktopSlider = () => {
  control.addEventListener('mousedown', () => isActive = true);
  control.addEventListener('mouseup', () => isActive = false);
  control.addEventListener('selectstart', (evt) => evt.preventDefault())
  slider.addEventListener('mouseleave', () => sliderReset());
  slider.addEventListener('mousemove', (evt) => onSliderMouseMove(evt));
};

const mobileSlider = () => {
  control.addEventListener('touchstart', () => isActive = true);
  control.addEventListener('touchend', () => isActive = false);
  slider.addEventListener('touchcancel', () => {
    isActive = false;
    sliderReset();
  });
  slider.addEventListener('touchmove', (evt) => onSliderTouchMove(evt));
};

const initSlider = () => {
  if (!slider) {
    return;
  }
  mobileSlider();
  desktopSlider();
};

export { initSlider };
