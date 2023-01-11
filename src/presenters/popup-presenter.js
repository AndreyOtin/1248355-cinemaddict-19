import PopupView from '../views/popup-view';
import { render } from '../framework/render';
import AbstractFilmsPresenter from './abstract-films-presenter';
import Model from '../model/model';
import { isEscapeKey } from '../utils/dom';

export default class PopupPresenter extends AbstractFilmsPresenter {
  #film;
  #comments;
  #isPopupOpen;
  #model = new Model();

  constructor({ container }) {
    super();
    this.container = container;
  }

  get filmId() {
    return this.#film.id;
  }

  get isOpen() {
    return this.#isPopupOpen;
  }

  set isOpen(value) {
    this.#isPopupOpen = value;
  }

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  popupEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  init(film, {
    favoriteButtonClickHandler,
    historyButtonClickHandler,
    watchListButtonClickHandler
  }) {
    this.#film = film;
    this.#isPopupOpen = true;
    this.#comments = this.#model.getComments(this.#film.comments);
    this.component = new PopupView({
      comments: this.#comments,
      film: this.#film,
      closeButtonClickHandler: this.#handleCloseButtonClick,
      favoriteButtonClickHandler,
      historyButtonClickHandler,
      watchListButtonClickHandler
    });

    document.addEventListener('keydown', this.popupEscKeyDownHandler);
    document.body.classList.add('hide-overflow');
    render(this.component, this.container);
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.popupEscKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this.#isPopupOpen = false;
  }
}
