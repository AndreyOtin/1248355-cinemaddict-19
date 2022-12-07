import { createElement } from '../render.js';

function createFilmsTemplate() {
  return `
    <section class="films"></section>
  `;
}

export default class FilmsView {
  getTemplate() {
    return createFilmsTemplate();
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
