import FilmsListView from '../views/films-list-view';
import { remove, render, RenderPosition } from '../framework/render';
import FilmCardPresenter from './film-card-presenter';
import { FILMS_COUNT_PER_CLICK, FILMS_RENDER_START, FilmsListType, SortType } from '../consts/app';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import AbstractFilmsPresenter from './abstract-films-presenter';
import SortView from '../views/sort-view';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/sort';

export default class FilmsPresenter extends AbstractFilmsPresenter {
  #showMoreButtonPresenter;
  #handleDataChange;
  #renderedFilmsCount = FILMS_COUNT_PER_CLICK;
  #popupPresenter;
  #currentSortType = SortType.DEFAULT;
  #initialFilms;
  #sortComponent;
  #handleEmptyList;
  #isReplaced = false;

  constructor({ container, handleDataChange, popupPresenter, signForUpdate, handleEmptyList }) {
    super(signForUpdate);
    this.container = container;
    this.#handleDataChange = handleDataChange;
    this.#popupPresenter = popupPresenter;
    this.#handleEmptyList = handleEmptyList;
  }

  get isReplaced() {
    return this.#isReplaced;
  }

  set isReplaced(value) {
    this.#isReplaced = value;
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      handleDataChange: this.#handleDataChange,
      popupPresenter: this.#popupPresenter
    });

    filmCardPresenter.init(film);
    this._filmCardPresenter.set(film.id, filmCardPresenter);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter({
      clickHandler: this.#handleShowMoreButtonClick,
      container: this.component.element
    });

    this.#showMoreButtonPresenter.init();
  }

  #sortFilms(sortType = this.#currentSortType) {
    switch (sortType) {
      case SortType.DATE:
        this.films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.films.sort(sortFilmsByRating);
        break;
      default:
        this.films = [...this.#initialFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortButtonClick = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.clearList(false);
    this.renderList();
  };

  #handleShowMoreButtonClick = () => {
    const nextFilmsCount = Math.min(this.#renderedFilmsCount + FILMS_COUNT_PER_CLICK, this.films.length);
    this._renderFilms(this.#renderedFilmsCount, nextFilmsCount);
    this.#renderedFilmsCount += FILMS_COUNT_PER_CLICK;

    if (this.#renderedFilmsCount >= this.films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  renderList(films) {
    if (films) {
      this.films = [...films];
      this.#initialFilms = [...films];
      this.#sortFilms();
    }

    if (!this.films.length) {
      this.#handleEmptyList();
      return;
    }

    if (this.films.length > this.#renderedFilmsCount) {
      this.#renderShowMoreButton();
    }

    this._renderFilms(FILMS_RENDER_START, Math.min(this.films.length, this.#renderedFilmsCount));
  }

  renderSort() {
    this.#sortComponent = new SortView({
      sortButtonClickHandler: this.#handleSortButtonClick,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortComponent, this.container, RenderPosition.BEFOREBEGIN);
  }

  clearList(isRenderedFilmsCountReset = true) {
    this._filmCardPresenter.forEach((presenter) => presenter.destroy());
    this._filmCardPresenter.clear();
    this.#showMoreButtonPresenter.destroy();


    if (isRenderedFilmsCountReset) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_CLICK;
    }
  }

  resetSort() {
    this.#sortComponent.reset();
    this.#currentSortType = SortType.DEFAULT;
    this.#sortFilms();
  }

  removeSort() {
    remove(this.#sortComponent);
  }

  init(films) {
    this.component = new FilmsListView(FilmsListType.DEFAULT);
    render(this.component, this.container);
    this.renderList(films);
    this.renderSort();
  }
}
