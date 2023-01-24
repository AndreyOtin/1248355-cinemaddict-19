const FilmsListType = {
  DEFAULT: 'default',
  RATED: 'rated',
  COMMENTED: 'commented',
  EMPTY: 'no films'
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
  HISTORY: 'history',
  MOST_COMMENTED: 'mostCommented',
  TOP_RATED: 'topRated'
};

const filmsListTypeToTitle = {
  [FilmsListType.DEFAULT]: 'All movies. Upcoming',
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

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const APP_FILTERS = [FilterType.HISTORY, FilterType.WATCHLIST, FilterType.FAVORITES];

const FILMS_COUNT_ON_LOAD = 0;
const FILMS_COUNT_PER_CLICK = 5;
const FILMS_RENDER_START = 0;
const MAX_EXTRA_FILMS_COUNT = 2;
const MIN_COMMENTS_COUNT = 0;
const MIN_RATING_NUMBER = 0;
const MAX_DESCRIPTION_LENGTH = 140;

export {
  MAX_DESCRIPTION_LENGTH,
  MIN_COMMENTS_COUNT,
  MIN_RATING_NUMBER,
  APP_FILTERS,
  EMOTIONS,
  FilmsListType,
  filmsListTypeToTitle,
  FILMS_COUNT_ON_LOAD,
  FILMS_COUNT_PER_CLICK,
  FILMS_RENDER_START,
  MAX_EXTRA_FILMS_COUNT,
  SortType,
  FilterType,
  filterToMessage
};
