import AppPresenter from './presenters/app-presenter';
import FooterStatisticsView from './views/footer-statistics-view';
import UserProfileView from './views/user-profile-view';
import Model from './model/model';
import { render } from './framework/render';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const model = new Model();
const presenter = new AppPresenter({
  container: mainElement,
});

const films = [...model.getFilms()];
const filmsCount = films.length;

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView({ filmsCount }), footerElement);

presenter.init(films);
