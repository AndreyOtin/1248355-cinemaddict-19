import { render, replace } from '../framework/render';
import FilterView from '../views/filter-view';
import FilmsModel from '../model/films-model';
import FilterModel from '../model/filter-model';
import { EventType } from '../consts/observer';
import AbstractPresenter from './abstracts/abstract-presenter';

export default class FilterPresenter extends AbstractPresenter {
  #filmsModel = new FilmsModel();
  #filterModel = new FilterModel();

  constructor({ container }) {
    super();
    this.container = container;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => {
    this.update();
  };

  #handleFilterButtonClick = (type) => {
    if (type === this.#filterModel.filterType) {
      return;
    }

    this.#filterModel.setFilterType(EventType.FILTER_CHANGE, type);
  };

  #createNewComponent() {
    this.component = new FilterView({
      filter: this.#filterModel.filter,
      onFilterButtonClick: this.#handleFilterButtonClick,
      currentFilterType: this.#filterModel.filterType
    });
  }

  update() {
    const prevComponent = this.component;

    this.#createNewComponent();

    replace(this.component, prevComponent);
  }

  init() {
    this.#createNewComponent(this.#filterModel.filter);

    render(this.component, this.container);
  }


}
