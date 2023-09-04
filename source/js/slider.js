const slider = document.querySelector('.results__slider');
const before = slider.querySelector('.results__slider-img--before');
const after = slider.querySelector('.results__slider-img--after');
const control = slider.querySelector('.results__slider-control');

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
  if (!isActive) {
    return;
  }

  let x = evt.pageX;

  initSliderChange(x);
};

const onSliderTouchMove = (evt) => {
  if (!isActive) {
    return;
  }

  let x;

  for (let i = 0; i < evt.changedTouches.length; i++) {
    x = evt.changedTouches[i].pageX;
  }

  initSliderChange(x);
};

const desktopSlider = () => {
  control.addEventListener('mousedown', () => isActive = true);
  control.addEventListener('mouseup', () => isActive = false);
  slider.addEventListener('selectstart', (evt) => evt.preventDefault())
  slider.addEventListener('mouseleave', () => isActive = false);
  slider.addEventListener('mousemove', (evt) => onSliderMouseMove(evt));
};

const mobileSlider = () => {
  control.addEventListener('touchstart', () => isActive = true);
  control.addEventListener('touchend', () => isActive = false);
  control.addEventListener('touchcancel', () => isActive = false);
  control.addEventListener('touchmove', (evt) => onSliderTouchMove(evt));
};

const initSlider = () => {
  desktopSlider();
  mobileSlider();
};

export { initSlider };
