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

  #handleFilmCardClick = () => {
    if (this.#popupPresenter.isOpen) {
      this.#popupPresenter.destroy();
    }

    this.#popupPresenter.init(this.#film, {
      favoriteButtonClickHandler: this.#handleFavoriteButtonClick,
      historyButtonClickHandler: this.#handleHistoryButtonClick,
      watchListButtonClickHandler: this.#handleWatchListButtonClick
    });
  };

  #handleFavoriteButtonClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleFavoriteActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.favorite = !updatedFilm.userDetails.favorite;
    this.#handleDataChange(updatedFilm);
  };

  #handleWatchListButtonClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleWatchlistActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.watchlist = !updatedFilm.userDetails.watchlist;
    this.#handleDataChange(updatedFilm);
  };

  #handleHistoryButtonClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleHistoryActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.alreadyWatched = !updatedFilm.userDetails.alreadyWatched;
    this.#handleDataChange(updatedFilm);
  };
}
