import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonTemplate = () => `
    <button class="films-list__show-more">Show more</button>
  `;

export default class ShowMoreButtonView extends AbstractView {
  #handleButtonClick;

  constructor({ onButtonClick }) {
    super();

    this.#handleButtonClick = onButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
