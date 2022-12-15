import { createElement } from '../render.js';

const createFilmsListTemplate = ({ title, extra }) => `
    <section class="films-list ${extra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>
  `;

export default class FilmsListView {
  #typeData;
  #element;
  #container;

  constructor(typeData) {
    this.#typeData = typeData;
  }

  #getTemplate() {
    return createFilmsListTemplate(this.#typeData);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  getContainer() {
    if (!this.#container) {
      this.#container = this.#element.querySelector('.films-list__container');
    }

    return this.#container;
  }

  removeElement() {
    this.#element = null;
  }
}
