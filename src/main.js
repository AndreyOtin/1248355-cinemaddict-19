import FilmsPresenter from './presenter/films-presenter';
import { render } from './render';
import FooterStatisticsView from './view/footer-statistics-view';
import PopupView from './view/popup-view';
import UserProfileView from './view/user-profile-view';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const filmsPresenter = new FilmsPresenter(mainElement);
const popupComponent = new PopupView();

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView(), footerElement);
render(popupComponent, document.body);

filmsPresenter.init();

setTimeout(() => {
  popupComponent.removeElement();
}, 5000);
