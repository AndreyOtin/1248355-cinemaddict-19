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

export { EMOTIONS, FilmsListType, filmsListTypeToTitle, FILMS_COUNT, FILMS_COUNT_PER_CLICK, ActiveButtonClassName };
