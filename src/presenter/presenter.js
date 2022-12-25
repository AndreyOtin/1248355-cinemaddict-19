import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import FilmsListView from '../views/films-list-view.js';
import ShowMoreButtonView from '../views/show-more-button-view.js';
import FilmCardView from '../views/film-card-view.js';
import PopupView from '../views/popup-view.js';
import { getRandomArrayElement } from '../utils/common.js';
import { Title, FILMS_COUNT_PER_CLICK } from '../consts/others.js';
import { remove, render } from '../framework/render.js';
import { isEscapeKey } from '../utils/dom.js';

export default class Presenter {
  #container;
  #model;
  #films;
  #pickedFilm;
  #comments;
  #popupComponent;
  #showMoreButtonComponent;
  #filmsListComponent;
  #mostCommentedListComponent;
  #topRatedListComponent;
  #sortComponent;
  #menuComponent;
  #filmsComponent;
  #noFilmsComponent;
  #renderedFilmsCount = FILMS_COUNT_PER_CLICK;
  #filter;

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;
  }

  #popupEscKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closePopup();
    }
  };

  #handleShowMoreBtnClick = () => {
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_CLICK)
      .forEach((film) => {
        this.#renderFilm(film, this.#filmsListComponent.getContainer());
      });

    this.#renderedFilmsCount += FILMS_COUNT_PER_CLICK;
    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #showPopup() {
    this.#popupComponent = new PopupView({
      comments: this.#comments,
      film: this.#pickedFilm,
      closeBtnClickHandler: () => {
        this.#closePopup();
      }
    });

    document.addEventListener('keydown', this.#popupEscKeydownHandler);
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #closePopup() {
    document.removeEventListener('keydown', this.#popupEscKeydownHandler);
    document.body.classList.remove('hide-overflow');
    remove(this.#popupComponent);
  }

  #renderFilm(film, container) {
    const filmComponent = new FilmCardView({
      film,
      clickHandler: () => {
        this.#showPopup();
      }
    });

    render(filmComponent, container);
  }

  #renderFilms() {
    if (!this.#films.length) {
      this.#noFilmsComponent = new FilmsListView({ title: Title.NO_MOVIES });
      this.#noFilmsComponent.removeContainer();
      render(this.#noFilmsComponent, this.#filmsComponent.element);
      return;
    }

    this.#filmsListComponent = new FilmsListView({ title: '' });
    this.#mostCommentedListComponent = new FilmsListView({ title: Title.MOST_COMMENTED, extra: true });
    this.#topRatedListComponent = new FilmsListView({ title: Title.TOP_RATED, extra: true });

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_CLICK); i++) {
      this.#renderFilm(this.#films[i], this.#filmsListComponent.getContainer());
    }

    for (let i = 0; i < Math.min(this.#films.length, 2); i++) {
      this.#renderFilm(this.#films[i], this.#mostCommentedListComponent.getContainer());
    }

    for (let i = 0; i < Math.min(this.#films.length, 2); i++) {
      this.#renderFilm(this.#films[i], this.#topRatedListComponent.getContainer());
    }

    if (this.#films.length > FILMS_COUNT_PER_CLICK) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({ clickHandler: this.#handleShowMoreBtnClick });
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }

    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#mostCommentedListComponent, this.#filmsComponent.element);
    render(this.#topRatedListComponent, this.#filmsComponent.element);
  }

  init() {
    this.#filter = this.#model.getFilter();
    this.#films = [...this.#model.getFilms()];
    this.#pickedFilm = getRandomArrayElement(this.#films);
    this.#comments = [...this.#model.getComments(this.#pickedFilm?.comments)];

    this.#sortComponent = new SortView();
    this.#menuComponent = new MenuView({ filter: this.#filter });
    this.#filmsComponent = new FilmsView();

    this.#renderFilms();

    if (!this.#films.length) {
      render(this.#menuComponent, this.#container);
      render(this.#filmsComponent, this.#container);
      return;
    }

    render(this.#menuComponent, this.#container);
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
  }
}
