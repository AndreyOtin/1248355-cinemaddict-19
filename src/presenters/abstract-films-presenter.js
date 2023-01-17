import { remove } from '../framework/render';
import { UpdateType } from '../consts/app';

export default class AbstractFilmsPresenter {
  #component;
  #container;
  #films;
  _filmCardPresenter = new Map();

  constructor(signForUpdate) {
    if (new.target === AbstractFilmsPresenter) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }

    signForUpdate(this.#observer);
  }

  get component() {
    return this.#component;
  }

  set component(component) {
    this.#component = component;
  }

  get container() {
    return this.#container;
  }

  set container(container) {
    this.#container = container;
  }

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films;
  }

  _renderFilm() {
    throw new Error('Abstract method not implemented: _renderFilm');
  }

  _renderFilms(from, to) {
    for (let i = from; i < to; i++) {
      this._renderFilm(this.#films[i]);
    }
  }

  #updateFilmCard(updatedFilm) {
    if (this._filmCardPresenter.has(updatedFilm.id)) {
      this._filmCardPresenter.get(updatedFilm.id).update(updatedFilm);
    }
  }

  #observer = (type, updatedFilm) => {
    switch (type) {
      case UpdateType.PATCH:
        this.#updateFilmCard(updatedFilm);
        break;
    }
  };

  init() {
    throw new Error('Abstract method not implemented: init');
  }

  destroy() {
    remove(this.#component);
  }
}
