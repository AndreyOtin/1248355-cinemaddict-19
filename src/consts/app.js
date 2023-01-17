const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FilmsListType = {
  DEFAULT: 'default',
  RATED: 'rated',
  COMMENTED: 'commented',
  EMPTY: 'no films'
};

const ActiveButtonClassName = {
  POPUP: 'film-details__control-button--active',
  FILM_CARD: 'film-card__controls-item--active',
  SORT_BUTTON: 'sort__button--active',
  FILTER_BUTTON: 'main-navigation__item--active'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const SortType = {
  DEFAULT: 'default',
  RATING: 'rating',
  DATE: 'date'
};

const FilterType = {
  ALL: 'all',
  FAVORITES: 'favorites',
  WATCHLIST: 'watchlist',
  HISTORY: 'history'
};

const filmsListTypeToTitle = {
  [FilterType.DEFAULT]: 'All movies. Upcoming',
  [FilmsListType.RATED]: 'Top rated',
  [FilmsListType.COMMENTED]: 'Most commented',
  [FilmsListType.EMPTY]: 'There are no movies in our database'
};

const filterToMessage = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
};

const FILMS_COUNT = 12;
const FILMS_COUNT_PER_CLICK = 5;
const FILMS_RENDER_START = 0;
const FILMS_RENDER_END = 2;
const SCROLL_X_POSITION = 0;
const DEBOUNCE_DELAY = 200;
const DEFAULT_SCROLL_POSITION = 0;


export {
  EMOTIONS,
  FilmsListType,
  filmsListTypeToTitle,
  FILMS_COUNT,
  FILMS_COUNT_PER_CLICK,
  ActiveButtonClassName,
  FILMS_RENDER_START,
  FILMS_RENDER_END,
  SCROLL_X_POSITION,
  DEBOUNCE_DELAY,
  DEFAULT_SCROLL_POSITION,
  UpdateType,
  SortType,
  FilterType,
  filterToMessage
};
