const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const isValueTypeOfObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null && !(value instanceof Date);

const createRandomElementsArray = (elements, length) => {
  const newElements = [...elements];

  for (let i = 0; i < Math.min(newElements.length, length); i++) {
    const randomIndex = getRandomNumber(i, newElements.length - 1);

    [newElements[i], newElements[randomIndex]] = [newElements[randomIndex], newElements[i]];
  }

  return length === newElements.length ? newElements : newElements.slice(0, Math.min(length, newElements.length));
};

export {
  isValueTypeOfObject,
  getRandomNumber,
  createRandomElementsArray
};
