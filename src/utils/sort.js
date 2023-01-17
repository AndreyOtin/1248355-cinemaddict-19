import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmsByDate = (filmA, filmB) => {
  const dateA = filmA.filmInfo.release.date;
  const dateB = filmB.filmInfo.release.date;

  const weight = getWeightForNullDate(dateA, dateB);

  return weight ?? dayjs(dateB).diff(dayjs(dateA));
};

const sortFilmsByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export { sortFilmsByDate, sortFilmsByRating };
