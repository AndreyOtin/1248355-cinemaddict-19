import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import { FilmsListType, FilterType, UpdateType } from '../consts/app.js';
import { render, RenderPosition, replace } from '../framework/render.js';
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
  #noFilmsComponent;
  #currentFilterType = FilterType.ALL;
  #popupPresenter = new PopupPresenter({
    container: document.body,
  });

  constructor({ container }) {
    super();
    this.#container = container;
  }

  #signForUpdate = (observer) => {
    this.addObserver(observer);
  };

  #renderFilteredFilms(type, reset) {
    if (this.#filmsPresenter.isReplaced) {
      this.#filmsPresenter.isReplaced = false;
      this.#filmsPresenter.renderSort();
      replace(this.#filmsPresenter.component, this.#noFilmsComponent);
    }

    this.#filmsPresenter.clearList(reset);
    this.#filmsPresenter.renderList(this.#filter[type].films);
  }

  #handleEmptyList = () => {
    this.#noFilmsComponent = new FilmsListView(FilmsListType.EMPTY, this.#currentFilterType);
    this.#filmsPresenter.isReplaced = true;
    this.#filmsPresenter.removeSort();
    replace(this.#noFilmsComponent, this.#filmsPresenter.component);
  };

  #handleDataChange = (updatedFilm) => {
    this.#films = updateItems(this.#films, updatedFilm);
    this.#filter = generateFilter(this.#films);
    this.#updateMenu();
    this._notify(UpdateType.PATCH, updatedFilm);

    if (this.#currentFilterType !== FilterType.ALL) {
      this.#renderFilteredFilms(this.#currentFilterType, false);
    }
  };

  #handleFilterButtonClick = (type) => {
    if (type === this.#currentFilterType) {
      return;
    }

    this.#currentFilterType = type;
    this.#renderFilteredFilms(type);
    this.#filmsPresenter.resetSort();
  };

  #renderNoFilmsList() {
    this.#noFilmsComponent = new FilmsListView(FilmsListType.EMPTY, this.#currentFilterType);
    render(this.#noFilmsComponent, this.#component.element, RenderPosition.AFTERBEGIN);
  }

  #renderFilmsList() {
    this.#filmsPresenter = new FilmsPresenter({
      container: this.#component.element,
      handleDataChange: this.#handleDataChange,
      popupPresenter: this.#popupPresenter,
      signForUpdate: this.#signForUpdate,
      handleEmptyList: this.#handleEmptyList
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

  #createMenuComponent() {
    this.#menuComponent = new MenuView({
      filter: this.#filter,
      filterButtonClickHandler: this.#handleFilterButtonClick,
      currentFilterType: this.#currentFilterType
    });
  }

  #renderMenu() {
    this.#createMenuComponent();
    render(this.#menuComponent, this.#container);
  }

  #updateMenu() {
    const prevComponent = this.#menuComponent;
    this.#createMenuComponent();
    replace(this.#menuComponent, prevComponent);
  }

  #renderFilmsContainer() {
    render(this.#component, this.#container);
  }

  #renderApp() {
    this.#renderMenu();
    this.#renderFilmsContainer();

    if (!this.#films.length) {
      this.#renderNoFilmsList();
      return;
    }

    this.#renderFilmsList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  init(films) {
    this.#films = films;
    this.#filter = this.#model.getFilter();
    this.#component = new FilmsView();
    this.#renderApp();
  }
}
