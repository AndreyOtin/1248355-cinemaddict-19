import { render } from '../framework/render';
import ShowMoreButtonView from '../views/show-more-button-view';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class ShowMoreButtonPresenter extends AbstractPresenter {
  #handleButtonClick;

  constructor({ container, onButtonClick }) {
    super();
    this.container = container;
    this.#handleButtonClick = onButtonClick;
  }

  init() {
    super.init();

    this.component = new ShowMoreButtonView({ onButtonClick: this.#handleButtonClick });

    render(this.component, this.container);
  }
}

