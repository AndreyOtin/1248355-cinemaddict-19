import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import { FilmsListType, UpdateType } from '../consts/app.js';
import { render, replace } from '../framework/render.js';
import FilmsPresenter from './films-presenter';
import Model from '../model/model';
import { updateItems } from '../utils/common';
import { generateFilter } from '../mocks/filters';
import MostCommentedFilmsPresenter from './most-commented-films-presenter';
import TopRatedFilmsPresenter from './top-rated-films-presenter';
import FilmsListView from '../views/films-list-view';
import PopupPresenter from './popup-presenter';
import Observable from '../framework/observable';

export default class AppPresenter extends Observable {
  #model = new Model();
  #films;
  #filter;
  #container;
  #component;
  #menuComponent;
  #mostCommentedFilmsPresenter;
  #topRatedFilmsListPresenter;
  #filmsPresenter;
  #popupPresenter = new PopupPresenter({
    container: document.body,
  });

  constructor({ container }) {
    super();
    this.#container = container;
  }

  #signForUpdate = (cb) => {
    this.addObserver(cb);
  };

  #handleDataChange = (updatedFilm) => {
    this.#films = updateItems(this.#films, updatedFilm);
    this._notify(UpdateType.PATCH, updatedFilm);
    this.#renderMenu();
  };

  #renderNoFilmsList() {
    const noFilmsComponent = new FilmsListView(FilmsListType.EMPTY);
    render(noFilmsComponent, this.#component.element);
  }

  #renderFilmsList() {
    this.#filmsPresenter = new FilmsPresenter({
      container: this.#component.element,
      handleDataChange: this.#handleDataChange,
      popupPresenter: this.#popupPresenter,
      signForUpdate: this.#signForUpdate
    });

    this.#filmsPresenter.init(this.#films);
  }

  #renderMostCommentedList() {
    this.#mostCommentedFilmsPresenter = new MostCommentedFilmsPresenter({
      container: this.#component.element,
      handleDataChange: this.#handleDataChange,
      popupPresenter: this.#popupPresenter,
      signForUpdate: this.#signForUpdate
    });

    this.#mostCommentedFilmsPresenter.init(this.#films);
  }

  #renderTopRatedList() {
    this.#topRatedFilmsListPresenter = new TopRatedFilmsPresenter({
      container: this.#component.element,
      handleDataChange: this.#handleDataChange,
      popupPresenter: this.#popupPresenter,
      signForUpdate: this.#signForUpdate
    });

    this.#topRatedFilmsListPresenter.init(this.#films);
  }

  #renderSort() {
    render(new SortView(), this.#container);
  }

  #renderMenu() {
    const prevComponent = this.#menuComponent;
    this.#filter = generateFilter(this.#films);
    this.#menuComponent = new MenuView({ filter: this.#filter });

    if (!prevComponent) {
      render(this.#menuComponent, this.#container);
      return;
    }

    replace(this.#menuComponent, prevComponent);
  }

  #renderApp() {
    if (!this.#films.length) {
      this.#renderNoFilmsList();
      return;
    }

    this.#renderMenu();
    this.#renderSort();
    this.#renderFilmsList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
    render(this.#component, this.#container);
  }


  init(films) {
    this.#films = films;
    this.#filter = this.#model.getFilter();
    this.#component = new FilmsView();
    this.#renderApp();
  }
}
