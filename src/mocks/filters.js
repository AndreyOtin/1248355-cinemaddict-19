import { filter } from '../utils/filter';

const generateFilter = (films) => Object.entries(filter)
  .reduce((generatedFilter, [name, filterFilms]) => {
    const filteredFilms = filterFilms(films);

    generatedFilter[name] = {
      films: filteredFilms,
      count: filteredFilms.length
    };

    return generatedFilter;
  }, {});

export { generateFilter };
