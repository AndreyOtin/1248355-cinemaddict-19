import FilmCardView from '../views/film-card-view';
import { render, replace } from '../framework/render';

export default class FilmCardPresenter {
  #popupPresenter;
  #film;
  #handleDataChange;
  #container;
  #component;

  constructor({ container, popupPresenter, handleDataChange }) {
    this.#container = container;
    this.#popupPresenter = popupPresenter;
    this.#handleDataChange = handleDataChange;
  }

  #createNewComponent(film) {
    this.#film = film;
    this.#component = new FilmCardView({
      film,
      filmCardClickHandler: this.#handleFilmCardClick,
      favoriteButtonClickHandler: this.#handleFavoriteButtonClick,
      historyButtonClickHandler: this.#handleHistoryButtonClick,
      watchListButtonClickHandler: this.#handleWatchListButtonClick
    });
  }

  init(film) {
    this.#createNewComponent(film);
    render(this.#component, this.#container);
  }

  update(updatedFilm) {
    const prevComponent = this.#component;
    this.#createNewComponent(updatedFilm);
    replace(this.#component, prevComponent);
  }

  #showPopup() {
    this.#popupPresenter.init(this.#film, {
      handleDataChange: this.#handleDataChange
    });

  }

  #handleFilmCardClick = () => {
    if (this.#popupPresenter.isPopupOpen && this.#film.id === this.#popupPresenter.filmId) {
      return;
    }

    if (this.#popupPresenter.isPopupOpen) {
      this.#popupPresenter.destroy();
    }

    this.#showPopup();
  };

  #updateControlButton(type) {
    this.#handleDataChange({
      ...this.#film,
      userDetails: { ...this.#film.userDetails, [type]: !this.#film.userDetails[type] }
    });

    if (this.#popupPresenter.isPopupOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.update(type);
    }
  }

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
