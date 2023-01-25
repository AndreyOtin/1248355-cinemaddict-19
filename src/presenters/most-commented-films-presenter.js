import { FILMS_RENDER_START, FilmsListType, MAX_EXTRA_FILMS_COUNT } from '../consts/app';
import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import AbstractFilmsPresenter from './abstracts/abstract-films-presenter';
import FilterModel from '../model/filter-model';
import { sortFilmsByCommentsCount } from '../utils/sort';
import { createRandomElementsArray } from '../utils/common';
import { EventType } from '../consts/observer';

export default class MostCommentedFilmsPresenter extends AbstractFilmsPresenter {
  #filterModel = new FilterModel();

  constructor({ container, popupPresenter, filmsModel, commentModel }) {
    super({ popupPresenter, filmsModel, commentModel });
    this.container = container;

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent = (event) => {
    switch (event) {
      case EventType.INIT:
        break;
      default:
        this._clearList();
        this._renderList();
    }
  };

  _renderList() {
    this.#setFilms();
    this.#handleFilmsEmptyList();
    this._renderFilms(FILMS_RENDER_START, Math.min(MAX_EXTRA_FILMS_COUNT, this.films.length));
  }

  _clearList() {
    this._filmCardPresenter.forEach((presenter) => presenter.destroy());
    this._filmCardPresenter.clear();
  }

  #setFilms() {
    this.films = this.#filterModel.mostCommentedFilms;

    const isAllCommentsCountEqual = this.films.every((film, index, arr) => film.comments.length === arr[0].comments.length);

    if (isAllCommentsCountEqual && this.films.length > MAX_EXTRA_FILMS_COUNT) {
      this.films = createRandomElementsArray(this.films, MAX_EXTRA_FILMS_COUNT);
      return;
    }

    this.films.sort(sortFilmsByCommentsCount);
  }

  init() {
    super.init();
    this.#setFilms();

    this.component = new FilmsListView(FilmsListType.COMMENTED);

    if (!this.films.length) {
      this.destroy();
      return;
    }

    this._renderFilms(FILMS_RENDER_START, Math.min(MAX_EXTRA_FILMS_COUNT, this.films.length));
    render(this.component, this.container);
  }

  #handleFilmsEmptyList() {
    if (!this.films.length && !this.isComponentDestroyed) {
      this.destroy();
      return;
    }

    if (this.films.length && this.isComponentDestroyed) {
      this.rerender();
    }
  }
}
