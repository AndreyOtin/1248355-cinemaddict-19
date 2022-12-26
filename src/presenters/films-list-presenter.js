import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import FilmCardPresenter from './film-card-presenter';
import { FILMS_COUNT_PER_CLICK, FilmsListType } from '../consts/app';
import ShowMoreBtnPresenter from './show-more-btn-presenter';
import AbstractPresenter from './abstract-presenter';
import PopupPresenter from './popup-presenter';

export default class FilmsListPresenter extends AbstractPresenter {
  #films;
  #showMoreButtonPresenter;
  #handleDataChange;
  #renderedFilmsCount = FILMS_COUNT_PER_CLICK;
  #filmCardPresenter = new Map();
  #popupPresenter = new PopupPresenter({
    container: document.body,
  });

  constructor({ container, dataChangeHandler }) {
    super();
    this.container = container;
    this.#handleDataChange = dataChangeHandler;
  }

  #renderShowMoreButton() {
    this.#showMoreButtonPresenter = new ShowMoreBtnPresenter({
      clickHandler: this.#handleShowMoreBtnClick,
      container: this.component.container
    });

    this.#showMoreButtonPresenter.init();
  }

  #renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      popupPresenter: this.#popupPresenter,
      dataChangeHandler: this.#handleDataChange
    });

    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  }

  #renderFilms(from, to) {
    for (let i = from; i < to; i++) {
      this.#renderFilm(this.#films[i]);
    }
  }

  #handleShowMoreBtnClick = () => {
    const nextFilmsCount = Math.min(this.#renderedFilmsCount + FILMS_COUNT_PER_CLICK, this.#films.length);
    this.#renderFilms(this.#renderedFilmsCount, nextFilmsCount, this.component.container);
    this.#renderedFilmsCount += FILMS_COUNT_PER_CLICK;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreButtonPresenter.destroy();
    }
  };

  init(type, films) {
    this.component = new FilmsListView(type);
    this.#films = films;

    if (type === FilmsListType.COMMENTED || type === FilmsListType.RATED) {
      this.#renderFilms(0, 2);
      render(this.component, this.container);
      return;
    }

    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_PER_CLICK));

    if (this.#films.length > FILMS_COUNT_PER_CLICK) {
      this.#renderShowMoreButton();
    }

    render(this.component, this.container);
  }

  updateFilmCard(updatedFilm) {
    if (this.#filmCardPresenter.has(updatedFilm.id)) {
      this.#filmCardPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  }

}
