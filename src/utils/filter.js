import { APP_FILTERS, FilterType, MIN_COMMENTS_COUNT, MIN_RATING_NUMBER } from '../consts/app';

const filter = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.MOST_COMMENTED]: (films) => films.filter((film) => film.comments.length > MIN_COMMENTS_COUNT),
  [FilterType.TOP_RATED]: (films) => films.filter((film) => film.filmInfo.totalRating > MIN_RATING_NUMBER)
};

const generateFilter = (films) => APP_FILTERS
  .reduce((generatedFilter, filterType) => {
    generatedFilter[filterType] = {
      count: filter[filterType](films).length
    };

    return generatedFilter;
  }, {});

export { filter, generateFilter };
