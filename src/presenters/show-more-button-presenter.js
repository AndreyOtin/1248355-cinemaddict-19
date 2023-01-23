import { render } from '../framework/render';
import ShowMoreButtonView from '../views/show-more-button-view';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class ShowMoreButtonPresenter extends AbstractPresenter {
  #handleClick;

  constructor({ container, onClick }) {
    super();
    this.container = container;
    this.#handleClick = onClick;
  }

  init() {
    super.init();

    this.component = new ShowMoreButtonView({ onClick: this.#handleClick });

    render(this.component, this.container);
  }
}
