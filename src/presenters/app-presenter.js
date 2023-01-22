import FilmsView from '../views/films-view.js';
import { render } from '../framework/render.js';
import FilmsPresenter from './films-presenter';
import MostCommentedFilmsPresenter from './most-commented-films-presenter';
import TopRatedFilmsPresenter from './top-rated-films-presenter';
import PopupPresenter from './popup-presenter';
import CommentsModel from '../model/comments-model';
import FilterPresenter from './filter-presenter';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class AppPresenter extends AbstractPresenter {
  #filmsModel;
  #filterModel;
  #commentModel = new CommentsModel();
  #filterPresenter;
  #mostCommentedFilmsPresenter;
  #topRatedFilmsListPresenter;
  #filmsPresenter;
  #popupPresenter;

  constructor({ container, filmsModel, filterModel }) {
    super();
    this.container = container;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#popupPresenter = new PopupPresenter({
      container: document.body,
      filmsModel: this.#filmsModel,
      commentModel: this.#commentModel,
      filterModel: this.#filterModel
    });
  }

  #renderFilterMenu() {
    this.#filterPresenter = new FilterPresenter({ container: this.container });

    this.#filterPresenter.init();
  }

  #renderFilmsList() {
    this.#filmsPresenter = new FilmsPresenter({
      container: this.component.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      commentModel: this.#commentModel
    });

    this.#filmsPresenter.init();
  }

  #renderMostCommentedList() {
    this.#mostCommentedFilmsPresenter = new MostCommentedFilmsPresenter({
      container: this.component.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      commentModel: this.#commentModel
    });

    this.#mostCommentedFilmsPresenter.init();
  }

  #renderTopRatedList() {
    this.#topRatedFilmsListPresenter = new TopRatedFilmsPresenter({
      container: this.component.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      commentModel: this.#commentModel
    });

    this.#topRatedFilmsListPresenter.init();
  }

  #renderFilmsContainer() {
    render(this.component, this.container);
  }

  #renderApp() {
    this.#renderFilterMenu();
    this.#renderFilmsContainer();
    this.#renderFilmsList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  init() {
    this.component = new FilmsView();

    this.#renderApp();
  }
}
