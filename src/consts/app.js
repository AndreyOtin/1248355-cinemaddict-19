const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FilmsListType = {
  DEFAULT: 'default',
  RATED: 'rated',
  COMMENTED: 'commented',
  EMPTY: 'no films'
};

const ActiveButtonClassName = {
  POPUP: 'film-details__control-button--active',
  FILM_CARD: 'film-card__controls-item--active'
};

const filmsListTypeToTitle = {
  [FilmsListType.DEFAULT]: 'All movies. Upcoming',
  [FilmsListType.RATED]: 'Top rated',
  [FilmsListType.COMMENTED]: 'Most commented',
  [FilmsListType.EMPTY]: 'There are no movies in our database'
};

const FILMS_COUNT = 10;
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
  DEFAULT_SCROLL_POSITION
};
