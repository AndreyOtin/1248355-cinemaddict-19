import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MAX_DESCRIPTION_LENGTH, UserRank } from '../consts/app';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRelativeTime = (date) => dayjs(date).fromNow();

const getPluralWord = (number, map) => map[new Intl.PluralRules('cy').select(number)];

const getDottedDescription = (description) => description.length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...` : description;

const formatDate = (releaseDate, format) => releaseDate && dayjs(releaseDate).format(format);

const formatDuration = (movieDuration, dayjsFormat) => {
  const format = movieDuration / 60 < 1 ? dayjsFormat.MINUTES : dayjsFormat.FULL;

  return movieDuration && dayjs.duration(movieDuration, 'minutes').format(format);
};

const getUserRank = (watchedFilmsCount) => {
  if (!watchedFilmsCount) {
    return null;
  }

  if (watchedFilmsCount <= 10) {
    return UserRank.NOVICE;
  }

  if (watchedFilmsCount <= 20) {
    return UserRank.FAN;
  }

  return 'movie buff';
};

const makeFirstLetterUpperCase = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

export {
  getUserRank,
  getRelativeTime,
  formatDate,
  formatDuration,
  getPluralWord,
  makeFirstLetterUpperCase,
  getDottedDescription
};
