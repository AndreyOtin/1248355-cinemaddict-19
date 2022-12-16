import Presenter from './presenter/presenter';
import FooterStatisticsView from './views/footer-statistics-view';
import UserProfileView from './views/user-profile-view';
import Model from './model/model';
import { render } from './render';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const model = new Model();
const presenter = new Presenter({
  container: mainElement,
  model
});
const filmsCount = model.getFilms().length;

if (filmsCount) {
  render(new UserProfileView(), headerElement);
}

render(new FooterStatisticsView({ filmsCount }), footerElement);

presenter.init();
