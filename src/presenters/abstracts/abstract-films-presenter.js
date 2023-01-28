import { EventType, UserAction } from '../../consts/observer';
import FilmCardPresenter from '../film-card-presenter';
import AbstractPresenter from './abstract-presenter';
import UiBlocker from '../../framework/ui-blocker/ui-blocker';
import { BlockTimeLimit } from '../../consts/app';

export default class AbstractFilmsPresenter extends AbstractPresenter {
  #films;
  _popupPresenter;
  _filmsModel;
  _commentModel;
  _filmCardPresenter = new Map();
  #uiBlocker = new UiBlocker({
    lowerLimit: BlockTimeLimit.LOWER_LIMIT,
    upperLimit: BlockTimeLimit.UPPER_LIMIT
  });

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

  _clearList() {
    this._filmCardPresenter.forEach((presenter) => presenter.destroy());
    this._filmCardPresenter.clear();
  }

  _renderList() {
    throw new Error('Abstract method not implemented: _renderList');
  }

  _renderFilm(film) {
    const filmCardPresenter = new FilmCardPresenter({
      container: this.component.container,
      handleDataChange: this._handleViewAction,
      popupPresenter: this._popupPresenter
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

  _handleViewAction = (actionType, event, payload) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.TOGGLE_FILTER_CONTROL:
      case UserAction.TOGGLE_POPUP_FILTER_CONTROL:
        this._filmsModel.updateFilm(event, payload)
          .then(() => {
            this.#uiBlocker.unblock();
          })
          .catch(() => {
            this.#uiBlocker.unblock();

            if (actionType === UserAction.TOGGLE_POPUP_FILTER_CONTROL) {
              this._popupPresenter.setAborting(UserAction.TOGGLE_POPUP_FILTER_CONTROL);
              return;
            }

            this._filmCardPresenter.get(payload.id).setAborting();
          });
        break;
      case UserAction.ADD_COMMENT:
        this._popupPresenter.setSubmitting();
        this._commentModel.addComment(event, payload)
          .then(() => {
            this.#uiBlocker.unblock();
          })
          .catch(() => {
            this.#uiBlocker.unblock();
            this._popupPresenter.setAborting(UserAction.ADD_COMMENT);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._popupPresenter.setDeleting();
        this._commentModel.deleteComment(event, payload)
          .then(() => {
            this.#uiBlocker.unblock();
          })
          .catch(() => {
            this.#uiBlocker.unblock();
            this._popupPresenter.setAborting(UserAction.DELETE_COMMENT);
          });
        break;
      default:
        break;
    }
  };

  _handleModelEvent(event, payload) {
    switch (event) {
      case EventType.INIT:
        break;
      default:
        this._updateFilmCard(payload);
    }
  }
}
