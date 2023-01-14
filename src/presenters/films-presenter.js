import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import FilmCardPresenter from './film-card-presenter';
import { FILMS_COUNT_PER_CLICK, FILMS_RENDER_START, FilmsListType } from '../consts/app';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import AbstractFilmsPresenter from './abstract-films-presenter';

export default class FilmsPresenter extends AbstractFilmsPresenter {
  #showMoreButtonPresenter;
  #handleDataChange;
  #handlePopupChange;
  #renderedFilmsCount = FILMS_COUNT_PER_CLICK;

  constructor({ container, handleDataChange, handlePopupChange }) {
    super();
    this.container = container;
    this.#handleDataChange = handleDataChange;
    this.#handlePopupChange = handlePopupChange;
  }

  #renderShowMoreButton() {
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter({
      clickHandler: this.#handleShowMoreButtonClick,
      container: this.component.container
    });

    this.#showMoreButtonPresenter.init();
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      handleDataChange: this.#handleDataChange,
      handlePopupChange: this.#handlePopupChange
    });

    filmCardPresenter.init(film);
    this._filmCardPresenter.set(film.id, filmCardPresenter);
  }

  #handleShowMoreButtonClick = () => {
    const nextFilmsCount = Math.min(this.#renderedFilmsCount + FILMS_COUNT_PER_CLICK, this.films.length);
    this._renderFilms(this.#renderedFilmsCount, nextFilmsCount, this.component.container);
    this.#renderedFilmsCount += FILMS_COUNT_PER_CLICK;

    if (this.#renderedFilmsCount >= this.films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  init(films) {
    this.component = new FilmsListView(FilmsListType.DEFAULT);
    this.films = films;
    this._renderFilms(FILMS_RENDER_START, Math.min(this.films.length, FILMS_COUNT_PER_CLICK));

    if (this.films.length > FILMS_COUNT_PER_CLICK) {
      this.#renderShowMoreButton();
    }

    render(this.component, this.container);
  }

}
