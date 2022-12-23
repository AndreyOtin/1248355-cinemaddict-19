import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonTemplate = () => `
    <button class="films-list__show-more">Show more</button>
  `;

export default class ShowMoreButtonView extends AbstractView {
  #handleClick;

  constructor({ clickHandler }) {
    super();
    this.#handleClick = clickHandler;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #clickHandler = () => {
    this.#handleClick();
  };
}
