import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import MenuView from '../view/menu-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmsPresenter {
  sortComponent = new SortView();
  menuComponent = new MenuView();
  filmsComponent = new FilmsView();
  filmsListComponet = new FilmsListView();
  filmsListContainerComponet = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();

  constructor(container) {
    this.mainContainer = container;
  }

  init() {
    render(this.menuComponent, this.mainContainer);
    render(this.sortComponent, this.mainContainer);
    render(this.filmsComponent, this.mainContainer);
    render(this.filmsListComponet, this.filmsComponent.getElement());
    render(this.filmsListContainerComponet, this.filmsListComponet.getElement());
    render(this.showMoreButtonComponent, this.filmsListComponet.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainerComponet.getElement());
    }
  }
}
