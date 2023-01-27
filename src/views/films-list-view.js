import AbstractView from '../framework/view/abstract-view.js';
import { FilmsListType, filmsListTypeToTitle, filterToMessage } from '../consts/app';

const createFilmsListTemplate = (type, filter) => {
  const title = filmsListTypeToTitle[type];
  const emptyFilmsMessage = filterToMessage[filter];

  switch (type) {
    case FilmsListType.EMPTY:
      return `
        <section class="films-list">
          <h2 class="films-list__title">${emptyFilmsMessage}</h2>
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
  #filter;
  #container;

  constructor(type, filter) {
    super();

    this.#type = type;
    this.#filter = filter;
  }

  get template() {
    return createFilmsListTemplate(this.#type, this.#filter);
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
