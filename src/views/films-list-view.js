import { createElement } from '../render.js';

const createFilmsListTemplate = ({ title , extra }) => `
    <section class="films-list ${extra ? 'films-list--extra' : ''}">
      <h2 class="films-list__title">${title}</h2>
    </section>
  `;

export default class FilmsListView {
  constructor(data) {
    this.data = data;
  }

  getTemplate() {
    return createFilmsListTemplate(this.data);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
