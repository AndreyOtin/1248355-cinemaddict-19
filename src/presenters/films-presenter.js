import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import { FilmsListType } from '../consts/app.js';
import { render, replace } from '../framework/render.js';
import FilmsListPresenter from './films-list-presenter';
import AbstractPresenter from './abstract-presenter';
import Model from '../model/model';
import { updateItems } from '../utils/common';
import { generateFilter } from '../mocks/filters';

export default class FilmsPresenter extends AbstractPresenter {
  #model = new Model();
  #films;
  #filter;
  #menuComponent;
  #mostCommentedFilmsListPresenter;
  #topRatedFilmsListPresenter;
  #filmsListPresenter;

  constructor({ container }) {
    super();
    this.container = container;
  }

  #handleDataChange = (updatedFilm) => {
    this.#films = updateItems(this.#films, updatedFilm);
    this.#mostCommentedFilmsListPresenter.updateFilmCard(updatedFilm);
    this.#topRatedFilmsListPresenter.updateFilmCard(updatedFilm);
    this.#filmsListPresenter.updateFilmCard(updatedFilm);
    this.#renderMenu();
  };

  #renderNoFilmsList() {
    const noFilmsListPresenter = new FilmsListPresenter({
      container: this.component.element,
    });

    noFilmsListPresenter.init(FilmsListType.EMPTY);
  }

  #renderFilmsList() {
    this.#filmsListPresenter = new FilmsListPresenter({
      container: this.component.element,
      dataChangeHandler: this.#handleDataChange
    });

    this.#filmsListPresenter.init(FilmsListType.DEFAULT, this.#films);
  }

  #renderMostCommentedList() {
    this.#mostCommentedFilmsListPresenter = new FilmsListPresenter({
      container: this.component.element,
      dataChangeHandler: this.#handleDataChange
    });

    this.#mostCommentedFilmsListPresenter.init(FilmsListType.COMMENTED, this.#films);
  }

  #renderTopRatedList() {
    this.#topRatedFilmsListPresenter = new FilmsListPresenter({
      container: this.component.element,
      dataChangeHandler: this.#handleDataChange
    });

    this.#topRatedFilmsListPresenter.init(FilmsListType.RATED, this.#films);
  }

  #renderSort() {
    render(new SortView(), this.container);
  }

  #renderMenu() {
    const prevComponent = this.#menuComponent;
    this.#filter = generateFilter(this.#films);
    this.#menuComponent = new MenuView({ filter: this.#filter });

    if (!prevComponent) {
      render(this.#menuComponent, this.container);
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
    render(this.component, this.container);
  }


  init(films) {
    this.#films = films;
    this.#filter = this.#model.getFilter();
    this.component = new FilmsView();
    this.#renderApp();
  }
}
