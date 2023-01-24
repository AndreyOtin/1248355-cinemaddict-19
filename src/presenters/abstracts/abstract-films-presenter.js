import { UserAction } from '../../consts/observer';
import FilmCardPresenter from '../film-card-presenter';
import AbstractPresenter from './abstract-presenter';

export default class AbstractFilmsPresenter extends AbstractPresenter {
  #films;
  _popupPresenter;
  _filmsModel;
  _commentModel;
  _filmCardPresenter = new Map();

  constructor({ popupPresenter, filmsModel, commentModel }) {
    super();

    if (new.target === AbstractFilmsPresenter) {
      throw new Error('Can\'t instantiate AbstractFilmsPresenter, only concrete one.');
    }

    this._popupPresenter = popupPresenter;
    this._filmsModel = filmsModel;
    this._commentModel = commentModel;
  }

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films;
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      handleDataChange: this._handleViewAction,
      popupPresenter: this._popupPresenter,
    });

    filmCardPresenter.init(film);
    this._filmCardPresenter.set(film.id, filmCardPresenter);
  }

  _renderFilms(from, to) {
    for (let i = from; i < to; i++) {
      this._renderFilm(this.#films[i]);
    }
  }

  _updateFilmCard(updatedFilm) {
    if (this._filmCardPresenter.has(updatedFilm.id)) {
      this._filmCardPresenter.get(updatedFilm.id).update(updatedFilm);
    }
  }

  _handleViewAction = (actionType, event, update) => {
    switch (actionType) {
      case UserAction.TOGGLE_FILTER_CONTROL:
        this._filmsModel.updateFilm(event, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentModel.addComment(event, update.comment);
        this._filmsModel.updateFilm(event, update.film);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentModel.deleteComment(event, update.comment);
        this._filmsModel.updateFilm(event, update.film);
        break;
    }
  };

  _handleModelEvent(event, update) {
    switch (event) {
      default:
        this._updateFilmCard(update);
    }
  }

  _clearList() {
    throw new Error('Abstract method not implemented: _clearList');
  }

  _renderList() {
    throw new Error('Abstract method not implemented: _renderList');
  }
}
