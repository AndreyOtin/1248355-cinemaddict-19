import { FILMS_COUNT } from '../consts/app';
import { generateComments } from '../mocks/comments';
import { generateFilms } from '../mocks/films';
import { generateFilter } from '../mocks/filters';

export default class Model {
  #films = generateFilms(FILMS_COUNT);
  #comments = generateComments();
  #filter = generateFilter(this.#films);

  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
  }

  getFilms() {
    return this.#films;
  }

  getComments(ids) {
    if (!Array.isArray(ids) || !ids.length) {
      return [];
    }

    return ids.map((id) => this.#comments.find((comment) => comment.id === id));
  }

  getFilter() {
    return this.#filter;
  }
}
