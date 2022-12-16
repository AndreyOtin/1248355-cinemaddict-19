import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import FilmsListView from '../views/films-list-view.js';
import ShowMoreButtonView from '../views/show-more-button-view.js';
import FilmCardView from '../views/film-card-view.js';
import PopupView from '../views/popup-view.js';
import { getRandomArrayElement, isEscapeKey } from '../utils.js';
import { render } from '../render.js';
import { Title } from '../consts/others.js';

export default class Presenter {
  #container;
  #model;
  #films;
  #pickedFilm;
  #comments;
  #popupComponent;

  #sortComponent = new SortView();
  #menuComponent = new MenuView();
  #filmsComponent = new FilmsView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListComponet = new FilmsListView({ title: '' });
  #mostCommentedListComponent = new FilmsListView({ title: Title.MOST_COMMENTED, extra: true });
  #topRatedListComponent = new FilmsListView({ title: Title.TOP_RATED, extra: true });

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

  init() {
    this.#films = [...this.#model.getFilms()];
    this.#pickedFilm = getRandomArrayElement(this.#films);
    this.#comments = [...this.#model.getComments(this.#pickedFilm.comments)];

    render(this.#menuComponent, this.#container);
    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);

    render(this.#filmsListComponet, this.#filmsComponent.getElement());
    render(this.#showMoreButtonComponent, this.#filmsListComponet.getElement());
    render(this.#mostCommentedListComponent, this.#filmsComponent.getElement());
    render(this.#topRatedListComponent, this.#filmsComponent.getElement());

    for (let i = 0; i < 5; i++) {
      this.#renderFilm(this.#films[i], this.#filmsListComponet.getContainer());
    }

    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#films[i], this.#mostCommentedListComponent.getContainer());
    }

    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#films[i], this.#topRatedListComponent.getContainer());
    }
  }
}
