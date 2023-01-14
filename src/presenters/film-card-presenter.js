import FilmCardView from '../views/film-card-view';
import { render, replace } from '../framework/render';
import PopupPresenter from './popup-presenter';
import { DEFAULT_SCROLL_POSITION } from '../consts/app';

export default class FilmCardPresenter {
  popupPresenter;
  #film;
  #handleDataChange;
  #handlePopupChange;
  #component;
  #container;

  constructor({ container, handleDataChange, handlePopupChange }) {
    this.#container = container;
    this.#handlePopupChange = handlePopupChange;
    this.#handleDataChange = handleDataChange;
    this.popupPresenter = new PopupPresenter({
      container: document.body,
    });
  }

  init(film) {
    this.#film = film;
    const prevComponent = this.#component;
    this.#component = new FilmCardView({
      film,
      filmCardClickHandler: this.#handleFilmCardClick,
      favoriteButtonClickHandler: this.#handleFavoriteButtonClick,
      historyButtonClickHandler: this.#handleHistoryButtonClick,
      watchListButtonClickHandler: this.#handleWatchListButtonClick
    });

    if (!prevComponent) {
      render(this.#component, this.#container);
      return;
    }

    if (this.popupPresenter.isOpen) {
      this.#updatePopup();
    }

    replace(this.#component, prevComponent);
  }

  #updatePopup() {
    const currentScroll = this.popupPresenter.scrollPosition;
    this.popupPresenter.destroy();
    this.#showPopup(currentScroll);
  }

  #showPopup(scrollPosition = DEFAULT_SCROLL_POSITION) {
    this.popupPresenter.init(this.#film, scrollPosition, {
      favoriteButtonClickHandler: this.#handleFavoriteButtonClick,
      historyButtonClickHandler: this.#handleHistoryButtonClick,
      watchListButtonClickHandler: this.#handleWatchListButtonClick
    });

  }

  #updateControlButton(type) {
    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails[type] = !updatedFilm.userDetails[type];
    this.#handleDataChange(updatedFilm);
  }

  #handleFilmCardClick = () => {
    this.#handlePopupChange();
    this.#showPopup();
  };

  #handleFavoriteButtonClick = (type) => {
    this.#updateControlButton(type);
  };

  #handleWatchListButtonClick = (type) => {
    this.#updateControlButton(type);
  };

  #handleHistoryButtonClick = (type) => {
    this.#updateControlButton(type);
  };
}
