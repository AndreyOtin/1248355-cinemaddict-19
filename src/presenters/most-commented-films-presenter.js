import { FILMS_RENDER_END, FILMS_RENDER_START, FilmsListType } from '../consts/app';
import PopupPresenter from './popup-presenter';
import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import AbstractFilmsPresenter from './abstract-films-presenter';
import FilmCardPresenter from './film-card-presenter';

export default class MostCommentedFilmsPresenter extends AbstractFilmsPresenter {
  #handleDataChange;
  #filmCardPresenter = new Map();
  #popupPresenter = new PopupPresenter({
    container: document.body,
  });

  constructor({ container, handleDataChange }) {
    super();
    this.container = container;
    this.#handleDataChange = handleDataChange;
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      popupPresenter: this.#popupPresenter,
      handleDataChange: this.#handleDataChange
    });

    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  }

  init(films) {
    this.films = films;
    this.component = new FilmsListView(FilmsListType.COMMENTED);
    this._renderFilms(FILMS_RENDER_START, FILMS_RENDER_END);
    render(this.component, this.container);
  }

  updateFilmCard(updatedFilm) {
    if (this.#filmCardPresenter.has(updatedFilm.id)) {
      this.#filmCardPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  }
}
