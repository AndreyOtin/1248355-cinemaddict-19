import Observable from '../framework/observable.js';
import { FilterType } from '../consts/app';
import { filter, generateFilter } from '../utils/filter';

export default class FilterModel extends Observable {
  #filterType = FilterType.ALL;
  #filter;
  #films;
  #mostCommentedFilms;
  #topRatedFilms;
  #filmsModel;

  constructor(filmsModel) {
    super();

    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;

    this.#filmsModel = filmsModel;
  }

  get films() {
    this.#films = filter[this.#filterType](this.#filmsModel.films);
    return this.#films;
  }

  get mostCommentedFilms() {
    this.#mostCommentedFilms = filter[FilterType.MOST_COMMENTED](this.#filmsModel.films);
    return this.#mostCommentedFilms;
  }

  get topRatedFilms() {
    this.#topRatedFilms = filter[FilterType.TOP_RATED](this.#filmsModel.films);
    return this.#topRatedFilms;
  }

  get filterType() {
    return this.#filterType;
  }

  get filter() {
    this.#filter = generateFilter(this.#filmsModel.films);
    return this.#filter;
  }

  setFilterType(updateType, filterType) {
    this.#filterType = filterType;

    this._notify(updateType, filterType);
  }
}
