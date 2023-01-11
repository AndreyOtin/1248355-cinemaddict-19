import AbstractView from '../framework/view/abstract-view.js';
import { FilmsListType, filmsListTypeToTitle } from '../consts/app';


const createFilmsListTemplate = (type) => {
  const title = filmsListTypeToTitle[type];

  switch (type) {
    case FilmsListType.EMPTY:
      return `
        <section class="films-list">
          <h2 class="films-list__title">${title}</h2>
        </section>`;

    default:
      return `
        <section class="films-list ${type !== FilmsListType.DEFAULT ? 'films-list--extra' : ''}">
          <h2 class="films-list__title ${type === FilmsListType.DEFAULT ? 'visually-hidden' : ''}">${title}</h2>
          <div class="films-list__container"></div>
        </section>`;
  }
};

export default class FilmsListView extends AbstractView {
  #type;
  #container;

  constructor(type) {
    super();
    this.#type = type;
  }

  get template() {
    return createFilmsListTemplate(this.#type);
  }

  get container() {
    if (!this.#container) {
      this.#container = this.element.querySelector('.films-list__container');
    }

    return this.#container;
  }

  removeElement() {
    super.removeElement();

    if (this.#container) {
      this.removeContainer();
    }
  }

  removeContainer() {
    this.#container = null;
  }
}
