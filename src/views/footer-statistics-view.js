import { pluralRuleToMovieWord } from '../consts/plural-rules.js';
import { createElement } from '../render.js';
import { getPluralWord } from '../utils.js';

const createFooterStatisticsTemplate = (filmsCount) => {
  const movieWord = getPluralWord(filmsCount, pluralRuleToMovieWord);

  return `
    <section class="footer__statistics">
      <p>${filmsCount ? filmsCount : ''} ${movieWord} inside</p>
    </section>
  `;
};

export default class FooterStatisticsView {
  #element;
  #filmsCount;

  constructor({ filmsCount }) {
    this.#filmsCount = filmsCount;
  }


  #getTemplate() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
