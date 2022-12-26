import PopupView from '../views/popup-view';
import { render } from '../framework/render';
import AbstractPresenter from './abstract-presenter';
import Model from '../model/model';
import { isEscapeKey } from '../utils/dom';

export default class PopupPresenter extends AbstractPresenter {
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

  #handleCloseBtnClick = () => {
    this.destroy();
  };

  escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  init(film, {
    favoriteClickHandler,
    historyClickHandler,
    watchListClickHandler
  }) {
    this.#film = film;
    this.#isPopupOpen = true;
    this.#comments = this.#model.getComments(this.#film.comments);
    this.component = new PopupView({
      comments: this.#comments,
      film: this.#film,
      closeBtnClickHandler: this.#handleCloseBtnClick,
      favoriteClickHandler,
      historyClickHandler,
      watchListClickHandler
    });

    document.addEventListener('keydown', this.escKeyDownHandler);
    document.body.classList.add('hide-overflow');
    render(this.component, this.container);
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this.#isPopupOpen = false;
  }
}
