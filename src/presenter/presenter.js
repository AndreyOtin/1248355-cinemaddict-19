import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import FilmsListView from '../views/films-list-view.js';
import ShowMoreButtonView from '../views/show-more-button-view.js';
import FilmCardView from '../views/film-card-view.js';
import PopupView from '../views/popup-view.js';
import { getRandomArrayElement, isEscapeKey } from '../utils.js';
import { render } from '../render.js';
import { Title, FILMS_PER_SHOW_MORE_CLICK } from '../consts/others.js';

export default class Presenter {
  #container;
  #model;
  #films;
  #pickedFilm;
  #comments;
  #popupComponent;
  #showMoreButtonComponent;
  #filmsListComponet;
  #mostCommentedListComponent;
  #topRatedListComponent;
  #sortComponent;
  #menuComponent;
  #filmsComponent;
  #renderedFilmsCount = FILMS_PER_SHOW_MORE_CLICK;

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;
  }

  #popupEscKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#popupEscKeydownHandler);
    }
  };

  #showMoreBtnClickHandler = () => {
    const films = this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_PER_SHOW_MORE_CLICK);
    this.#renderedFilmsCount += FILMS_PER_SHOW_MORE_CLICK;

    films.forEach((film) => {
      this.#renderFilm(film, this.#filmsListComponet.getContainer());
    });

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreButtonComponent.getElement().remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #showPopup() {
    this.#popupComponent = new PopupView({ comments: this.#comments, film: this.#pickedFilm });
    const popupCloseBtnElement = this.#popupComponent.getElement().querySelector('.film-details__close-btn');

    popupCloseBtnElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#popupEscKeydownHandler);
    });

    document.addEventListener('keydown', this.#popupEscKeydownHandler);
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #closePopup() {
    document.body.classList.remove('hide-overflow');
    this.#popupComponent.getElement().remove();
    this.#popupComponent.removeElement();
  }

  #renderFilm(film, container) {
    const filmComponent = new FilmCardView({ film });
    const filmLinkElement = filmComponent.getElement().querySelector('.film-card__link');

    filmLinkElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#showPopup();
    });

    render(filmComponent, container);
  }

  #renderFilms() {
    if (!this.#films.length) {
      const noFilmsComponent = new FilmsListView({ title: Title.NO_MOVIES });
      noFilmsComponent.getContainer().remove();
      noFilmsComponent.removeContainer();
      render(noFilmsComponent, this.#filmsComponent.getElement());
      return;
    }

    this.#filmsListComponet = new FilmsListView({ title: '' });
    this.#mostCommentedListComponent = new FilmsListView({ title: Title.MOST_COMMENTED, extra: true });
    this.#topRatedListComponent = new FilmsListView({ title: Title.TOP_RATED, extra: true });

    for (let i = 0; i < Math.min(this.#films.length, FILMS_PER_SHOW_MORE_CLICK); i++) {
      this.#renderFilm(this.#films[i], this.#filmsListComponet.getContainer());
    }

    for (let i = 0; i < Math.min(this.#films.length, 2); i++) {
      this.#renderFilm(this.#films[i], this.#mostCommentedListComponent.getContainer());
    }

    for (let i = 0; i < Math.min(this.#films.length, 2); i++) {
      this.#renderFilm(this.#films[i], this.#topRatedListComponent.getContainer());
    }

    if (this.#films.length > FILMS_PER_SHOW_MORE_CLICK) {
      this.#showMoreButtonComponent = new ShowMoreButtonView();
      this.#showMoreButtonComponent.getElement().addEventListener('click', this.#showMoreBtnClickHandler);

      render(this.#showMoreButtonComponent, this.#filmsListComponet.getElement());
    }

    render(this.#filmsListComponet, this.#filmsComponent.getElement());
    render(this.#mostCommentedListComponent, this.#filmsComponent.getElement());
    render(this.#topRatedListComponent, this.#filmsComponent.getElement());
  }

  init() {
    this.#sortComponent = new SortView();
    this.#menuComponent = new MenuView();
    this.#filmsComponent = new FilmsView();

    this.#films = [...this.#model.getFilms()];
    this.#pickedFilm = getRandomArrayElement(this.#films);
    this.#comments = [...this.#model.getComments(this.#pickedFilm?.comments)];

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
