import SortView from '../views/sort-view.js';
import MenuView from '../views/menu-view.js';
import FilmsView from '../views/films-view.js';
import FilmsListView from '../views/films-list-view.js';
import FilmsListContainerView from '../views/films-list-container-view.js';
import ShowMoreButtonView from '../views/show-more-button-view.js';
import FilmCardView from '../views/film-card-view.js';
import PopupView from '../views/popup-view.js';
import { getRandomArrayElement } from '../utils.js';
import { render } from '../render.js';
import { Title } from '../consts/others.js';

export default class Presenter {
  sortComponent = new SortView();
  menuComponent = new MenuView();
  filmsComponent = new FilmsView();
  filmsListComponet = new FilmsListView({ title: '' });
  filmsContainerComponet = new FilmsListContainerView();
  showMoreButtonComponent = new ShowMoreButtonView();
  mostCommentedListComponent = new FilmsListView({ title: Title.MOST_COMMENTED, extra: true });
  mostCommentedFilmsContainerComponet = new FilmsListContainerView();
  topRatedListComponent = new FilmsListView({ title: Title.TOP_RATED, extra: true });
  topRatedFilmsContainerComponet = new FilmsListContainerView();

  constructor({ container, model }) {
    this.container = container;
    this.model = model;
  }

  init() {
    this.films = [...this.model.getFilms()];
    this.pickedFilm = getRandomArrayElement(this.films);
    this.comments = [...this.model.getComments(this.pickedFilm.comments)];

    render(this.menuComponent, this.container);
    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);

    render(this.filmsListComponet, this.filmsComponent.getElement());
    render(this.filmsContainerComponet, this.filmsListComponet.getElement());
    render(this.showMoreButtonComponent, this.filmsListComponet.getElement());

    render(this.mostCommentedListComponent, this.filmsComponent.getElement());
    render(this.mostCommentedFilmsContainerComponet, this.mostCommentedListComponent.getElement());

    render(this.topRatedListComponent, this.filmsComponent.getElement());
    render(this.topRatedFilmsContainerComponet, this.topRatedListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView({ film: this.films[i] }), this.filmsContainerComponet.getElement());
    }

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({ film: this.films[i] }), this.topRatedFilmsContainerComponet.getElement());
    }

    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({ film: this.films[i] }), this.mostCommentedFilmsContainerComponet.getElement());
    }

    render(new PopupView({
      comments: this.comments,
      film: this.pickedFilm
    }), document.body);
  }
}
