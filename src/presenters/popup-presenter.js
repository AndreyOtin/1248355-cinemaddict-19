import PopupView from '../views/popup-view';
import { remove, render } from '../framework/render';
import Model from '../model/model';
import { isEscapeKey } from '../utils/dom';

export default class PopupPresenter {
  #film;
  #comments;
  #isPopupOpen;
  #container;
  #component;
  #model = new Model();

  constructor({ container }) {
    this.#container = container;
  }

  get filmId() {
    return this.#film.id;
  }

  get isPopupOpen() {
    return this.#isPopupOpen;
  }

  set isPopupOpen(value) {
    this.#isPopupOpen = value;
  }

  #handleFormSubmit = () => {
    this.destroy();
  };

  #handleCloseButtonClick = () => {
    this.destroy();
  };

  #popupEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  init(film, {
    handleDataChange
  }) {
    this.#film = film;
    this.#isPopupOpen = true;
    this.#comments = this.#model.getComments(this.#film.comments);
    this.#component = new PopupView({
      comments: this.#comments,
      film: this.#film,
      closeButtonClickHandler: this.#handleCloseButtonClick,
      formSubmitHandler: this.#handleFormSubmit,
      handleDataChange
    });

    document.addEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.add('hide-overflow');

    render(this.#component, this.#container);
  }

  update(type) {
    this.#component.updateControlButton(type);
  }

  destroy() {
    remove(this.#component);

    this.#isPopupOpen = false;

    document.removeEventListener('keydown', this.#popupEscKeyDownHandler);
    document.body.classList.remove('hide-overflow');
  }
}
