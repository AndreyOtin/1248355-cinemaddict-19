const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const debounce = (cb, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const createRandomElementsArray = (elements, length) => {
  const newElements = [...elements];

  for (let i = 0; i < Math.min(newElements.length, length); i++) {
    const randomIndex = getRandomNumber(i, newElements.length - 1);

    [newElements[i], newElements[randomIndex]] = [newElements[randomIndex], newElements[i]];
  }

  return length === newElements.length ? newElements : newElements.slice(0, Math.min(length, newElements.length));
};

export { getRandomNumber, getRandomArrayElement, debounce, createRandomElementsArray };
