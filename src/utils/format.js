import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getPluralWord = (number, map) => map[new Intl.PluralRules('cy').select(number)];

const getDottedDescription = (description) => description.length > 140 ? `${description.slice(0, 139)}...` : description;

const formatDate = (releaseDate, format) => releaseDate && dayjs(releaseDate).format(format);

const formatDuration = (movieDuration, dayjsFormat) => {
  const format = movieDuration / 60 < 1 ? dayjsFormat.MINUTES : dayjsFormat.FULL;

  return movieDuration && dayjs.duration(movieDuration, 'minutes').format(format);
};

const makeFirstLetterUpperCase = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

export {
  formatDate,
  formatDuration,
  getPluralWord,
  makeFirstLetterUpperCase,
  getDottedDescription
};
