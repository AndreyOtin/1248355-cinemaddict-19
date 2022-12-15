import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const isEscapeKey = (evt) => evt.key === 'Escape';

const getPluralWord = (number, map) => map[new Intl.PluralRules('cy').select(number)];

const formatDate = (releaseDate, format) => releaseDate && dayjs(releaseDate).format(format);

const formatDuration = (movieDuration, dayjsFormat) => {
  const format = movieDuration / 60 < 1 ? dayjsFormat.MINUTES : dayjsFormat.FULL;

  return movieDuration && dayjs.duration(movieDuration, 'minutes').format(format);
};

const makeFirstLetterUpperCase = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {
  getRandomArrayElement,
  getRandomNumber,
  formatDate,
  formatDuration,
  getPluralWord,
  makeFirstLetterUpperCase,
  isEscapeKey
};
