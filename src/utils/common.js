const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const updateItems = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { getRandomNumber, getRandomArrayElement, updateItems };
