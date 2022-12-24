const filter = {
  all: (films) => films,
  favorites: (films) => films.filter((film) => film.userDetails.favorite),
  watchlist: (films) => films.filter((film) => film.userDetails.watchlist),
  history: (films) => films.filter((film) => film.userDetails.alreadyWatched)
};

export { filter };
