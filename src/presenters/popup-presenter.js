import PopupView from '../views/popup-view';
import { render } from '../framework/render';
import { isEscapeKey } from '../utils/dom';
import { EventType, UserAction } from '../consts/observer';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class PopupPresenter extends AbstractPresenter {
  #film;
  #comments;
  #filmsModel;
  #commentModel;
  #handleDataChange;
  #handleFilterControlButtonClick;

  constructor({ container, filmsModel, commentModel }) {
    super();

    this.container = container;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentModel.addObserver(this.#handleModelEvent);
  }

  get filmId() {
    return this.#film.id;
  }

  #renderPopup(comments) {
    this.component = new PopupView({
      comments,
      film: this.#film,
      onCloseButtonClick: this.#handleCloseButtonClick,
      onFormSubmit: this.#handleFormSubmit,
      onFilterControlButtonClick: this.#handleFilterControlButtonClick,
      onDeleteButtonClick: this.#handleDeleteButtonClick
    });

    document.addEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.add('hide-overflow');

    render(this.component, this.container);
  }

  setDeleting() {
    this.component.updateElement({ isDeleting: true });
    this.component.restoreElementState();
  }

  setSubmitting() {
    this.component.updateElement({ isSubmitting: true });
    this.component.restoreElementState();
  }

  setAborting(action) {
    const resetPopupState = () => {
      this.component.updateElement({ isSubmitting: false, isDeleting: false });
      this.component.restoreElementState();
    };

    this.component.shake(resetPopupState, action);
  }

  init({ film, handleDataChange, onFilterControlButtonClick }) {
    super.init();

    this.#film = film;
    this.#handleDataChange = handleDataChange;
    this.#handleFilterControlButtonClick = onFilterControlButtonClick;

    this.#comments = this.#commentModel
      .getComments(EventType.GET_COMMENTS, this.#film)
      .catch(() => {
        this.#renderPopup();
      });
  }

  update({ film, comments }) {
    if (!this.isComponentDestroyed && film.id === this.filmId) {
      this.component.update(film, comments);
    }
  }

  destroy() {
    super.destroy();

    document.removeEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.remove('hide-overflow');
  }

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  #handleDeleteButtonClick = (id) => {
    this.#handleDataChange(UserAction.DELETE_COMMENT, EventType.DELETE_COMMENT, id);
  };

  #handleFormSubmit = (comment) => {
    this.#handleDataChange(UserAction.ADD_COMMENT, EventType.ADD_COMMENT, { film: this.#film, comment });
  };

  #popupEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case EventType.INIT:
      case EventType.FILTER_CHANGE:
        break;
      case EventType.GET_COMMENTS:
        this.#renderPopup(payload);
        break;
      case EventType.ADD_COMMENT:
        this.#filmsModel.init(EventType.RENDER_COMMENTS, payload.film.id);
        break;
      case EventType.DELETE_COMMENT:
        this.#filmsModel.init(EventType.RENDER_COMMENTS, this.#film.id);
        break;
      default:
        this.update({ film: payload, comments: this.#commentModel.comments });
    }
  };
}
