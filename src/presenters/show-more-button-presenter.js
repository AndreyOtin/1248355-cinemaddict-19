import { remove, render } from '../framework/render';
import ShowMoreButtonView from '../views/show-more-button-view';

export default class ShowMoreButtonPresenter {
  #handleClick;
  #container;
  #component;

  constructor({ container, clickHandler }) {
    this.#container = container;
    this.#handleClick = clickHandler;
  }

  init() {
    this.#component = new ShowMoreButtonView({ clickHandler: this.#handleClick });
    render(this.#component, this.#container);
  }

  destroy() {
    remove(this.#component);
  }
}
