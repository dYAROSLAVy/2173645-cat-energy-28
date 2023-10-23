const slider = document.querySelector('.results__slider');
const before = document.querySelector('.results__slider-img--before');
const after = document.querySelector('.results__slider-img--after');
const control = document.querySelector('.results__slider-control');

let isActive = false;

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

  initSliderChange(x);
};

const onSliderTouchMove = (evt) => {
  let x;

  for (let i = 0; i < evt.changedTouches.length; i++) {
    x = evt.changedTouches[i].pageX;
  }

  initSliderChange(x);
};

const desktopSlider = () => {
  if(!control) {
    return;
  }

  control.addEventListener('mousedown', () => isActive = true);
  control.addEventListener('mouseup', () => isActive = false);
  slider.addEventListener('selectstart', (evt) => evt.preventDefault())
  slider.addEventListener('mouseleave', () => isActive = false);
  slider.addEventListener('mousemove', (evt) => onSliderMouseMove(evt));
};

const mobileSlider = () => {
  if(!control) {
    return;
  }

  control.addEventListener('touchstart', () => isActive = true);
  control.addEventListener('touchend', () => isActive = false);
  control.addEventListener('touchcancel', () => isActive = false);
  control.addEventListener('touchmove', (evt) => onSliderTouchMove(evt));
};

const initSlider = () => {
  mobileSlider();
  desktopSlider();
};

export { initSlider };
