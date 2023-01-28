import FilmCardView from '../views/film-card-view';
import { render, replace } from '../framework/render';
import { EventType } from '../consts/observer';
import { FilterType } from '../consts/app';
import FilterModel from '../model/filter-model';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class FilmCardPresenter extends AbstractPresenter {
  #popupPresenter;
  #film;
  #handleDataChange;
  #filterModel = new FilterModel();

  constructor({ container, popupPresenter, handleDataChange }) {
    super();

    this.container = container;
    this.#popupPresenter = popupPresenter;
    this.#handleDataChange = handleDataChange;
  }

  #isPopupOpenedForThisFilm() {
    return !this.#popupPresenter.isComponentDestroyed && this.#film.id === this.#popupPresenter.filmId;
  }

  #showPopup() {
    this.#popupPresenter.init({
      film: this.#film,
      onFilterControlButtonClick: this.#handleFilterControlButtonClick,
      handleDataChange: this.#handleDataChange
    });
  }

  #createNewComponent(film) {
    this.#film = film;

    this.component = new FilmCardView({
      film,
      onFilmCardClick: this.#handleFilmCardClick,
      onFilterControlButtonClick: this.#handleFilterControlButtonClick
    });
  }

  setAborting() {
    this.component.shake();
  }

  init(film) {
    super.init();

    this.#createNewComponent(film);

    render(this.component, this.container);
  }

  update(updatedFilm) {
    const prevComponent = this.component;

    this.#createNewComponent(updatedFilm);

    replace(this.component, prevComponent);
  }

  #handleFilmCardClick = () => {
    if (this.#isPopupOpenedForThisFilm()) {
      return;
    }

    if (!this.#popupPresenter.isComponentDestroyed) {
      this.#popupPresenter.destroy();
    }

    this.#showPopup();
  };

  #handleFilterControlButtonClick = (type, action) => {
    const eventType = this.#filterModel.filterType === FilterType.ALL ? EventType.PATCH_CARD : EventType.RENDER_LIST;

    this.#film = {
      ...this.#film,
      userDetails: { ...this.#film.userDetails, [type]: !this.#film.userDetails[type] }
    };

    this.#handleDataChange(action, eventType, this.#film);
  };
}
