import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = ({ title, extra }) => `
    <section class="films-list ${extra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>
  `;

export default class FilmsListView extends AbstractView {
  #typeData;
  #container;

  constructor(typeData) {
    super();
    this.#typeData = typeData;
  }

  get template() {
    return createFilmsListTemplate(this.#typeData);
  }

  getContainer() {
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
    if (!this.#container) {
      this.getContainer();
    }

    this.#container.remove();
    this.#container = null;
  }
}
