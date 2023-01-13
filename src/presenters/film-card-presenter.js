import FilmCardView from '../views/film-card-view';
import { render, replace } from '../framework/render';
import AbstractFilmsPresenter from './abstract-films-presenter';

export default class FilmCardPresenter extends AbstractFilmsPresenter {
  #popupPresenter;
  #film;
  #handleDataChange;

  constructor({ container, popupPresenter, handleDataChange }) {
    super();
    this.container = container;
    this.#popupPresenter = popupPresenter;
    this.#handleDataChange = handleDataChange;
  }

  init(film) {
    this.#film = film;
    const prevComponent = this.component;
    this.component = new FilmCardView({
      film,
      filmCardClickHandler: this.#handleFilmCardClick,
      favoriteButtonClickHandler: this.#handleFavoriteButtonClick,
      historyButtonClickHandler: this.#handleHistoryButtonClick,
      watchListButtonClickHandler: this.#handleWatchListButtonClick
    });

    if (!prevComponent) {
      render(this.component, this.container);
      return;
    }

    replace(this.component, prevComponent);
  }

  #showPopup(scrollPosition = 0) {
    if (this.#popupPresenter.isOpen) {
      this.#popupPresenter.destroy();
    }

    this.#popupPresenter.init(this.#film, scrollPosition, {
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
    this.#showPopup();
  };

  #handleFavoriteButtonClick = (type, isPopupActivated) => {
    this.#updateControlButton(type);

    if (!isPopupActivated && this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#showPopup(this.#popupPresenter.scrollPosition);
    }
  };

  #handleWatchListButtonClick = (type, isPopupActivated) => {
    this.#updateControlButton(type);

    if (!isPopupActivated && this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#showPopup(this.#popupPresenter.scrollPosition);
    }
  };

  #handleHistoryButtonClick = (type, isPopupActivated) => {
    this.#updateControlButton(type);

    if (!isPopupActivated && this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#showPopup(this.#popupPresenter.scrollPosition);
    }
  };
}
