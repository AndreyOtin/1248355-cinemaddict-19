import { createElement } from '../render.js';

function createFooterStatisticsTemplate() {
  return `
    <section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  `;
}

export default class FooterStatisticsView {
  getTemplate() {
    return createFooterStatisticsTemplate();
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
