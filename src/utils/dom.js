import { Code } from '../consts/dom';

const isEscapeKey = (evt) => evt.code === Code.ESC;

const runOnKeys = (element, cb, ...codes) => {
  const pressedKeys = new Set();

  element.addEventListener('keydown', (evt) => {
    pressedKeys.add(evt.code);

    if (codes.every((code) => pressedKeys.has(code))) {
      cb();
    }
  });

  element.addEventListener('keyup', (evt) => {
    pressedKeys.delete(evt.code);
  });
};

const debounce = (cb, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export { isEscapeKey, runOnKeys, debounce };
