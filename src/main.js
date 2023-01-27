import AppPresenter from './presenters/app-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './api/films-api-service';
import { AUTHORIZATION, END_POINT } from './consts/api';
import CommentsApiService from './api/comments-api-service';
import CommentsModel from './model/comments-model';
import { render, replace } from './framework/render';
import UserProfileView from './views/user-profile-view';
import FooterStatisticsView from './views/footer-statistics-view';
import { DEFAULT_USER_RATING, FILMS_COUNT_ON_LOAD } from './consts/app';

let footerStatisticsComponent = new FooterStatisticsView({ filmsCount: FILMS_COUNT_ON_LOAD });
let userProfileComponent = new UserProfileView({ watchedFilmsCount: DEFAULT_USER_RATING });

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

const rerenderFooter = () => {
  const filmsCount = filmsModel.films.length;
  const previousFooterStatisticsComponent = footerStatisticsComponent;

  footerStatisticsComponent = new FooterStatisticsView({ filmsCount });

  replace(footerStatisticsComponent, previousFooterStatisticsComponent);
  filmsModel.removeObserver(rerenderFooter);
};

const rerenderUserProfile = () => {
  const watchedFilmsCount = filterModel.filter.history.count;
  const previousUserProfileComponent = userProfileComponent;

  userProfileComponent = new UserProfileView({ watchedFilmsCount });

  replace(userProfileComponent, previousUserProfileComponent);
};

render(userProfileComponent, headerElement);
render(footerStatisticsComponent, footerElement);

filmsModel.addObserver(rerenderFooter);
filmsModel.addObserver(rerenderUserProfile);

appPresenter.init();
filmsModel.init()
  .catch(() => {
    appPresenter.renderNoMoviesComponent();
  });
