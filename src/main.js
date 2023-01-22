import AppPresenter from './presenters/app-presenter';
import FooterStatisticsView from './views/footer-statistics-view';
import UserProfileView from './views/user-profile-view';
import { render } from './framework/render';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel(filmsModel);

const presenter = new AppPresenter({
  container: mainElement,
  filmsModel,
  filterModel
});

const films = filmsModel.films;
const filmsCount = films.length;

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView({ filmsCount }), footerElement);

presenter.init();
