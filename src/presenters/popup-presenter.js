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

  get scrollPosition() {
    return this.component.scrollValue;
  }

  init(film, scrollPosition, {
    favoriteButtonClickHandler,
    historyButtonClickHandler,
    watchListButtonClickHandler
  }) {
    this.#film = film;
    this.#isPopupOpen = true;
    this.#comments = this.#model.getComments(this.#film.comments);
    this.component = new PopupView({
      scrollPosition,
      comments: this.#comments,
      film: this.#film,
      closeButtonClickHandler: this.#handleCloseButtonClick,
      formSubmitHandler: this.#handleFormSubmit,
      favoriteButtonClickHandler,
      historyButtonClickHandler,
      watchListButtonClickHandler
    });


    document.addEventListener('keydown', this.popupEscKeyDownHandler);
    document.body.classList.add('hide-overflow');

    render(this.component, this.container);
    this.component.setScroll();
  }

  destroy() {
    super.destroy();
    this.#isPopupOpen = false;

    document.removeEventListener('keydown', this.popupEscKeyDownHandler);
    document.body.classList.remove('hide-overflow');
  }

  #handleFormSubmit = () => {
    this.destroy();
  };

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  popupEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };
}
