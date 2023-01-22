import PopupView from '../views/popup-view';
import { render } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import { EventType, UserAction } from '../consts/observer';
import AbstractPresenter from './abstracts/abstract-presenter';
import { FilterType } from '../consts/app';
import FilterModel from '../model/filter-model';


export default class PopupPresenter extends AbstractPresenter {
  #film;
  #comments;
  #filmsModel;
  #commentModel;
  #filterModel = new FilterModel();
  #handleDataChange;

  constructor({ container, filmsModel, commentModel }) {
    super();
    this.container = container;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentModel;
  }

  get filmId() {
    return this.#film.id;
  }

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  #handleControlButtonClick = (film) => {
    const eventType = this.#filterModel.filterType === FilterType.ALL ? EventType.PATCH_CARD : EventType.RENDER_LIST;

    this.#handleDataChange(UserAction.TOGGLE_FILTER_CONTROL, eventType, film);
  };

  #handleDeleteButtonClick = (payload) => {
    this.#handleDataChange(UserAction.DELETE_COMMENT, EventType.UPDATE_COMMENTS, payload);
  };

  #handleFormSubmit = (payload) => {
    this.#handleDataChange(UserAction.ADD_COMMENT, EventType.UPDATE_COMMENTS, payload);
  };

  #popupEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  init({ film, handleDataChange }) {
    super.init();

    this.#film = film;
    this.#comments = this.#commentModel.getComments(this.#film.comments);

    this.#handleDataChange = handleDataChange;

    this.component = new PopupView({
      comments: this.#comments,
      film: this.#film,
      OnCloseButtonClick: this.#handleCloseButtonClick,
      OnFormSubmit: this.#handleFormSubmit,
      OnControlButtonClick: this.#handleControlButtonClick,
      OnDeleteButtonClick: this.#handleDeleteButtonClick
    });

    document.addEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.add('hide-overflow');

    render(this.component, this.container);
  }

  update(film) {
    if (!this.isComponentDestroyed && film.id === this.filmId) {
      this.component.update(film, this.#commentModel.getComments(film.comments));
    }
  }

  destroy() {
    super.destroy();

    document.removeEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.remove('hide-overflow');
  }
}
