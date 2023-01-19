import { FILMS_COUNT } from '../consts/app';
import { generateFilms } from '../mocks/films';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #films = generateFilms(FILMS_COUNT);

  constructor() {
    super();

    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
  }

  get films() {
    return this.#films;
  }

  updateFilm(event, update) {
    this.#films = this.#films.map((film) => film.id === update.id ? update : film);

    this._notify(event, update);
  }
}
