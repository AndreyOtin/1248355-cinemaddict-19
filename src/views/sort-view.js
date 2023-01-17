import { ActiveButtonClassName, SortType } from '../consts/app';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createSortTemplate = (sortType) => `
    <ul class="sort">
      <li><a data-type="${SortType.DEFAULT}" href="#" class="sort__button ${sortType === SortType.DEFAULT ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by default</a></li>
      <li><a data-type="${SortType.DATE}" href="#" class="sort__button ${sortType === SortType.DATE ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by date</a></li>
      <li><a data-type="${SortType.RATING}" href="#" class="sort__button ${sortType === SortType.RATING ? ActiveButtonClassName.SORT_BUTTON : ''}">Sort by rating</a></li>
    </ul>
  `;

export default class SortView extends AbstractStatefulView {
  #handleSortButtonClick;

  constructor({ sortButtonClickHandler, currentSortType }) {
    super();
    this.#handleSortButtonClick = sortButtonClickHandler;
    this._setState({ sortType: currentSortType });
    this._restoreHandlers();
  }

  get template() {
    return createSortTemplate(this._state.sortType);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#sortButtonClickHandler);
  }

  #sortButtonClickHandler = (evt) => {
    if (evt.target.matches('a')) {
      evt.preventDefault();
      this.#handleSortButtonClick(evt.target.dataset.type);
      this.updateElement({ sortType: evt.target.dataset.type });
    }
  };

  reset() {
    this.updateElement({ sortType: SortType.DEFAULT });
  }
}
