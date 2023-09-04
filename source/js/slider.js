const slider = document.querySelector('.results__slider');
const before = slider.querySelector('.results__slider-img--before');
const after = slider.querySelector('.results__slider-img--after');
const control = slider.querySelector('.results__slider-control');

let isActive = false;

const beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.clipPath = `inset(0 ${slider.offsetWidth - shift}px 0 0)`;
  after.style.clipPath = `inset(0 0 0 ${shift}px)`;
  control.style.left = `${shift}px`;
};

const pauseEvents = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  return false;
};

const onBodyMouseMove = (evt) => {
  if (!isActive) {
    return;
  }

  let x = evt.pageX;

  x -= slider.getBoundingClientRect().left;

  beforeAfterSlider(x);

  pauseEvents(evt);
};

const initSlider = () => {
  slider.addEventListener('mousedown', () => isActive = true);

  document.body.addEventListener('mouseup', () => isActive = false);

  document.body.addEventListener('mouseleave', () => isActive = false);

  document.body.addEventListener('mousemove', (evt) => onBodyMouseMove(evt));
};

export { initSlider };
