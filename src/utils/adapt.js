import { isValueTypeOfObject } from './common';
import { DATE_KEYS } from '../consts/api';

const adaptToClient = (data, dateKeys = DATE_KEYS) => {
  const searchRegExp = /_+\w/g;

  return Object.entries(data).reduce((dataCopy, [key, value]) => {
    const newKey = key.replace(searchRegExp, (match) => match.slice(1).toUpperCase());

    if (isValueTypeOfObject(value)) {
      dataCopy[newKey] = adaptToClient(value, dateKeys);

      return dataCopy;
    }

    if (dateKeys.includes(newKey)) {
      dataCopy[newKey] = data[key] === null ? null : new Date(data[key]);

      return dataCopy;
    }

    dataCopy[newKey] = data[key];

    return dataCopy;
  }, {});
};

const adaptToServer = (data, dateKeys = DATE_KEYS) => {
  const searchRegExp = /\w[A-Z]/g;

  return Object.entries(data).reduce((dataCopy, [key, value]) => {
    const newKey = key.replace(searchRegExp, (match) => `${match[0]}_${match[1].toLowerCase()}`);

    if (isValueTypeOfObject(value)) {
      dataCopy[newKey] = adaptToServer(value, dateKeys);

      return dataCopy;
    }

    if (dateKeys.includes(newKey)) {
      dataCopy[newKey] = data[key] instanceof Date ? data[key].toISOString() : null;

      return dataCopy;
    }

    dataCopy[newKey] = data[key];

    return dataCopy;
  }, {});
};

export {
  adaptToServer,
  adaptToClient,
};
