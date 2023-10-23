const nav = document.querySelector('.nav');
const navToggle = nav.querySelector('.nav__toggle');

const changeNavState = () => {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
  }
};

const onNavToggleClick = () => changeNavState();

const initNav = () => {
  nav.classList.remove('nav--nojs');
  navToggle.addEventListener('click', onNavToggleClick);
};

export { initNav };
