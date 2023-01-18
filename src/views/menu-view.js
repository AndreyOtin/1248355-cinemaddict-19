import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { ActiveButtonClassName, FilterType } from '../consts/app';

const createMenuTemplate = ({ favorites, watchlist, history }, filterType) => `
    <nav class="main-navigation">
      <a data-type="${FilterType.ALL}" href="#all" class="main-navigation__item ${filterType === FilterType.ALL ? ActiveButtonClassName.FILTER_BUTTON : ''}">All movies</a>
      <a data-type="${FilterType.WATCHLIST}" href="#watchlist" class="main-navigation__item ${filterType === FilterType.WATCHLIST ? ActiveButtonClassName.FILTER_BUTTON : ''}">Watchlist <span class="main-navigation__item-count">${watchlist.count}</span></a>
      <a data-type="${FilterType.HISTORY}" href="#history" class="main-navigation__item ${filterType === FilterType.HISTORY ? ActiveButtonClassName.FILTER_BUTTON : ''}">History <span class="main-navigation__item-count">${history.count}</span></a>
      <a data-type="${FilterType.FAVORITES}" href="#favorites" class="main-navigation__item ${filterType === FilterType.FAVORITES ? ActiveButtonClassName.FILTER_BUTTON : ''}">Favorites <span class="main-navigation__item-count">${favorites.count}</span></a>
    </nav>
  `;

export default class MenuView extends AbstractStatefulView {
  #filter;
  #handleFilterButtonClick;

  constructor({ filter, filterButtonClickHandler, currentFilterType }) {
    super();
    this.#filter = filter;
    this.#handleFilterButtonClick = filterButtonClickHandler;
    this._setState({ filerType: currentFilterType });
    this._restoreHandlers();
  }

  get template() {
    return createMenuTemplate(this.#filter, this._state.filerType);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#filterButtonClickHandler);
  }

  #filterButtonClickHandler = (evt) => {
    if (evt.target.closest('a')) {
      evt.preventDefault();

      const type = evt.target.closest('a').dataset.type;

      this.#handleFilterButtonClick(type);
      this.updateElement({ filerType: type });
    }
  };


}
