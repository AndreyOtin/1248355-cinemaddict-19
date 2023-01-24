import AppPresenter from './presenters/app-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './API/films-api-service';
import { AUTHORIZATION, END_POINT } from './consts/api';
import CommentsApiService from './API/comments-api-service';
import CommentsModel from './model/comments-model';
import { render, replace } from './framework/render';
import UserProfileView from './views/user-profile-view';
import FooterStatisticsView from './views/footer-statistics-view';
import { FILMS_COUNT_ON_LOAD } from './consts/app';

let footerStatisticsComponent = new FooterStatisticsView({ filmsCount: FILMS_COUNT_ON_LOAD });

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const filmsApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const commentsApiService = new CommentsApiService(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel(filmsApiService);
const commentModel = new CommentsModel(commentsApiService);
const filterModel = new FilterModel(filmsModel);

const appPresenter = new AppPresenter({
  container: mainElement,
  filmsModel,
  filterModel,
  commentModel
});


const handleFilmsModelChange = () => {
  const filmsCount = filmsModel.films.length;
  const previousStatisticsComponent = footerStatisticsComponent;

  footerStatisticsComponent = new FooterStatisticsView({ filmsCount });

  replace(footerStatisticsComponent, previousStatisticsComponent);
};

render(new UserProfileView(), headerElement);
render(footerStatisticsComponent, footerElement);

filmsModel.addObserver(handleFilmsModelChange);

appPresenter.init();
filmsModel.init()
  .catch(() => {
    appPresenter.renderNoMoviesComponent();
  });
