import { remove } from '../framework/render';

export default class AbstractPresenter {
  #component;
  #container;

  constructor() {
    if (new.target === AbstractPresenter) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
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

  init() {
    throw new Error('Abstract method not implemented: init');
  }

  destroy() {
    remove(this.#component);
  }
}
