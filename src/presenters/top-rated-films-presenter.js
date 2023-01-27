import { FILMS_RENDER_START, FilmsListType, MAX_EXTRA_FILMS_COUNT } from '../consts/app';
import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import AbstractFilmsPresenter from './abstracts/abstract-films-presenter';
import FilterModel from '../model/filter-model';
import { sortFilmsByRating } from '../utils/sort';
import { createRandomElementsArray } from '../utils/common';

export default class TopRatedFilmsPresenter extends AbstractFilmsPresenter {
  #filterModel = new FilterModel();

  constructor({ container, popupPresenter, filmsModel, commentModel }) {
    super({ popupPresenter, filmsModel, commentModel });

    this.container = container;

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent = (event, payload) => {
    super._handleModelEvent(event, payload);
  };

  #setFilms() {
    this.films = this.#filterModel.topRatedFilms;

    const isAllRatesEqual = !this.films.some((film, index, arr) => film.filmInfo.totalRating !== arr[0].filmInfo.totalRating);

    if (isAllRatesEqual && this.films.length > MAX_EXTRA_FILMS_COUNT) {
      this.films = createRandomElementsArray(this.films, MAX_EXTRA_FILMS_COUNT);

      return;
    }

    this.films.sort(sortFilmsByRating);
  }

  init() {
    super.init();

    this.#setFilms();

    this.component = new FilmsListView(FilmsListType.RATED);

    if (!this.films.length) {
      this.destroy();

      return;
    }

    this._renderFilms(FILMS_RENDER_START, Math.min(MAX_EXTRA_FILMS_COUNT, this.films.length));

    render(this.component, this.container);
  }
}
