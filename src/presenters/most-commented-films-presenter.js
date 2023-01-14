import { FILMS_RENDER_END, FILMS_RENDER_START, FilmsListType } from '../consts/app';
import FilmsListView from '../views/films-list-view';
import { render } from '../framework/render';
import AbstractFilmsPresenter from './abstract-films-presenter';
import FilmCardPresenter from './film-card-presenter';

export default class MostCommentedFilmsPresenter extends AbstractFilmsPresenter {
  #handleDataChange;
  #handlePopupChange;

  constructor({ container, handleDataChange, handlePopupChange }) {
    super();
    this.container = container;
    this.#handleDataChange = handleDataChange;
    this.#handlePopupChange = handlePopupChange;
  }


  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      handleDataChange: this.#handleDataChange
    });

    filmCardPresenter.init(film);
    this._filmCardPresenter.set(film.id, filmCardPresenter);
  }

  init(films) {
    this.films = films;
    this.component = new FilmsListView(FilmsListType.COMMENTED);
    this._renderFilms(FILMS_RENDER_START, FILMS_RENDER_END);
    render(this.component, this.container);
  }
}
