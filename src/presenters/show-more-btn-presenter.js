import { render } from '../framework/render';
import ShowMoreButtonView from '../views/show-more-button-view';
import AbstractPresenter from './abstract-presenter';

export default class ShowMoreBtnPresenter extends AbstractPresenter {
  #handleClick;

  constructor({ container, clickHandler }) {
    super();
    this.container = container;
    this.#handleClick = clickHandler;
  }

  init() {
    this.component = new ShowMoreButtonView({ clickHandler: this.#handleClick });
    render(this.component, this.container);
  }
}
