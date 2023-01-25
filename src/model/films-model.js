import Observable from '../framework/observable';
import { adaptToClient } from '../utils/adapt';
import { EventType } from '../consts/observer';

export default class FilmsModel extends Observable {
  #filmsApiService;
  #films;

  constructor(filmsApiService) {
    super();

    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  init(event = EventType.INIT, id) {
    return this.#filmsApiService.films
      .then((films) => {
        this.#films = films.map((film) => adaptToClient(film));

        const updatedFilm = this.#films.find((film) => film.id === id);

        this._notify(event, updatedFilm);
      });
  }

  updateFilm(event, update) {
    return this.#filmsApiService.updateFilm(update)
      .then((response) => {
        const updatedFilm = adaptToClient(response);

        this.#films = this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);


        this._notify(event, updatedFilm);
      });
  }
}
