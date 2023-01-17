import { FilterType } from '../consts/app';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched)
};

export { filter };
