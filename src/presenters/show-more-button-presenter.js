import { render } from '../framework/render';
import ShowMoreButtonView from '../views/show-more-button-view';
import AbstractFilmsPresenter from './abstract-films-presenter';

export default class ShowMoreButtonPresenter extends AbstractFilmsPresenter {
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
