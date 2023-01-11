import AppPresenter from './presenters/app-presenter';
import FooterStatisticsView from './views/footer-statistics-view';
import UserProfileView from './views/user-profile-view';
import Model from './model/model';
import { render } from './framework/render';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const model = new Model();
const presenter = new AppPresenter({
  container: main,
});

const films = [...model.getFilms()];
const filmsCount = films.length;

render(new UserProfileView(), header);
render(new FooterStatisticsView({ filmsCount }), footer);

presenter.init(films);
