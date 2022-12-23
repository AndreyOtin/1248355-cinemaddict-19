import { pluralRuleToMovieWord } from '../consts/plural-rules.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getPluralWord } from '../utils/format.js';

const createFooterStatisticsTemplate = (filmsCount) => {
  const movieWord = getPluralWord(filmsCount, pluralRuleToMovieWord);

  return `
    <section class="footer__statistics">
      <p>${filmsCount ? filmsCount : ''} ${movieWord} inside</p>
    </section>
  `;
};

export default class FooterStatisticsView extends AbstractView {
  #filmsCount;

  constructor({ filmsCount }) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }
}
