import AbstractView from '../framework/view/abstract-view.js';

const createMenuTemplate = ({ favorites, watchlist, history }) => `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.count}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.count}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.count}</span></a>
    </nav>
  `;

export default class MenuView extends AbstractView {
  #filter;

  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createMenuTemplate(this.#filter);
  }
}
