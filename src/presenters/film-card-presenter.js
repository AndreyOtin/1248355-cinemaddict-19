import FilmCardView from '../views/film-card-view';
import { render, replace } from '../framework/render';
import AbstractPresenter from './abstract-presenter';

export default class FilmCardPresenter extends AbstractPresenter {
  #popupPresenter;
  #film;
  #handleDataChange;

  constructor({ container, popupPresenter, dataChangeHandler }) {
    super();
    this.container = container;
    this.#popupPresenter = popupPresenter;
    this.#handleDataChange = dataChangeHandler;
  }

  init = (film) => {
    this.#film = film;
    const prevComponent = this.component;
    this.component = new FilmCardView({
      film,
      clickHandler: this.#handleClick,
      favoriteClickHandler: this.#handleFavoriteClick,
      historyClickHandler: this.#handelHistoryClick,
      watchListClickHandler: this.#handelWatchListClick
    });

    if (!prevComponent) {
      render(this.component, this.container);
      return;
    }

    replace(this.component, prevComponent);
  };

  #handleClick = () => {
    if (this.#popupPresenter.isOpen) {
      this.#popupPresenter.destroy();
    }

    this.#popupPresenter.init(this.#film, {
      favoriteClickHandler: this.#handleFavoriteClick,
      historyClickHandler: this.#handelHistoryClick,
      watchListClickHandler: this.#handelWatchListClick
    });
  };

  #handleFavoriteClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleFavoriteActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.favorite = !updatedFilm.userDetails.favorite;
    this.#handleDataChange(updatedFilm);
  };

  #handelWatchListClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleWatchlistActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.watchlist = !updatedFilm.userDetails.watchlist;
    this.#handleDataChange(updatedFilm);
  };

  #handelHistoryClick = () => {
    if (this.#popupPresenter.isOpen && this.#film.id === this.#popupPresenter.filmId) {
      this.#popupPresenter.component.toggleHistoryActiveClass();
    }

    const updatedFilm = structuredClone(this.#film);
    updatedFilm.userDetails.alreadyWatched = !updatedFilm.userDetails.alreadyWatched;
    this.#handleDataChange(updatedFilm);
  };
}
