import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { SortType } from '../consts/app';
import { ActiveButtonClassName } from '../consts/dom';

const createSortTemplate = (sortType) => `
    <ul class="sort">
      <li><a data-type="${SortType.DEFAULT}" href="#" class="sort__button ${sortType === SortType.DEFAULT ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by default</a></li>
      <li><a data-type="${SortType.DATE}" href="#" class="sort__button ${sortType === SortType.DATE ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by date</a></li>
      <li><a data-type="${SortType.RATING}" href="#" class="sort__button ${sortType === SortType.RATING ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by rating</a></li>
    </ul>
  `;

export default class SortView extends AbstractStatefulView {
  #handleSortButtonClick;

  constructor({ onSortButtonClick, currentSortType }) {
    super();
    this.#handleSortButtonClick = onSortButtonClick;
    this._setState({ sortType: currentSortType });
    this._restoreHandlers();
  }

  get template() {
    return createSortTemplate(this._state.sortType);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#sortButtonClickHandler);
  }

  reset() {
    this.updateElement({ sortType: SortType.DEFAULT });
  }

  #sortButtonClickHandler = (evt) => {
    if (evt.target.matches('a')) {
      evt.preventDefault();

      const type = evt.target.dataset.type;

      this.#handleSortButtonClick(type);
      this.updateElement({ sortType: type });
    }
  };
}
