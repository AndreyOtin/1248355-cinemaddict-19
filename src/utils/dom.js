import { Code } from '../consts/dom';

const isEscapeKey = (evt) => evt.code === Code.ESC;

const runOnCtrlEnterOrCmdEnter = (element, cb) => {
  const pressedKeys = new Set();

  element.addEventListener('keydown', (evt) => {
    pressedKeys.add(evt.code);

    if (pressedKeys.has(Code.ENTER) && (pressedKeys.has(Code.CONTROL_LEFT) || pressedKeys.has(Code.META_LEFT))) {
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

export { isEscapeKey, runOnCtrlEnterOrCmdEnter, debounce };
