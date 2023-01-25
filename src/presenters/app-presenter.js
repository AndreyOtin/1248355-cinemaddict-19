import FilmsView from '../views/films-view.js';
import { remove, render, replace } from '../framework/render.js';
import FilmsPresenter from './films-presenter';
import MostCommentedFilmsPresenter from './most-commented-films-presenter';
import TopRatedFilmsPresenter from './top-rated-films-presenter';
import PopupPresenter from './popup-presenter';
import CommentsModel from '../model/comments-model';
import FilterPresenter from './filter-presenter';
import AbstractPresenter from './abstracts/abstract-presenter';
import LoadingView from '../views/loading-view';
import { EventType } from '../consts/observer';
import FilmsListView from '../views/films-list-view';
import { FilmsListType, FilterType } from '../consts/app';

export default class AppPresenter extends AbstractPresenter {
  #filmsModel;
  #filterModel;
  #commentModel = new CommentsModel();
  #filterPresenter;
  #mostCommentedFilmsPresenter;
  #topRatedFilmsListPresenter;
  #filmsPresenter;
  #popupPresenter;
  #isLoading = true;
  #loadingComponent = new LoadingView();

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

    this.#filmsModel.addObserver(this.#handleModelEvent);
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

  #renderApp() {
    if (this.#isLoading) {
      this.#renderFilterMenu();
      render(this.#loadingComponent, this.container);

      return;
    }

    render(this.component, this.container);
    this.#renderFilmsList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  renderNoMoviesComponent() {
    const noFilmsComponent = new FilmsListView(FilmsListType.EMPTY, FilterType.ALL);

    replace(noFilmsComponent, this.#loadingComponent);
  }

  init() {
    this.component = new FilmsView();

    this.#renderApp();
  }

  #handleModelEvent = (event) => {
    if (event === EventType.INIT) {
      this.#isLoading = false;

      this.#filmsModel.removeObserver(this.#handleModelEvent);
      remove(this.#loadingComponent);
      this.#renderApp();
    }
  };
}
