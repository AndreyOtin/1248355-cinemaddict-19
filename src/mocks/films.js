import { getRandomArrayElement } from '../utils/common.js';

const films = [
  {
    'id': 1,
    'comments': [
      1, 2, 4,
    ],
    'filmInfo': {
      'title': 'A Little Pony Without The Carpet',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': 3.7,
      'poster': 'images/posters/made-for-each-other.png',
      'ageRating': 14,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano',
        'Richard Weil',
        'Heinz Herald'
      ],
      'actors': [
        'Erich von Stroheim',
        'Mary Beth Hughes',
        'Brad Pitt',
        'Morgan Freeman'
      ],
      'release': {
        'date': 'Thu May 21 2015 00:00:00 GMT+0300 (Москва, стандартное время)',
        'releaseCountry': 'Finland'
      },
      'duration': 96,
      'genre': [
        'Drama',
        'Comedy'
      ],
      'description': 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Fusce tristique felis at fermentum pharetra. Cras aliquet varius magna, non porta ligula feugiat eget.'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 2,
    'comments': [
      5, 7, 8, 9, 3
    ],
    'filmInfo': {
      'title': 'Avengers',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': 6.2,
      'poster': 'images/posters/popeye-meets-sinbad.png',
      'ageRating': 17,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Mary Beth Hughes',
        'Erich von Stroheim',
        'Brad Pitt'
      ],
      'release': {
        'date': 'Tue Feb 11 2020 00:00:00 GMT+0300 (Москва, стандартное время)',
        'releaseCountry': 'Finland'
      },
      'duration': 34,
      'genre': [
        'Comedy',
        'Drama',
        'Musical'
      ],
      'description': 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Fusce tristique felis at fermentum pharetra.'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  },
  {
    'id': 3,
    'comments': [],
    'filmInfo': {
      'title': 'The Dark Khight',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': 7.5,
      'poster': 'images/posters/sagebrush-trail.jpg',
      'ageRating': 15,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano',
        'Anne Wigton'
      ],
      'actors': [
        'Brad Pitt',
        'Erich von Stroheim'
      ],
      'release': {
        'date': 'Fri Nov 20 2015 03:00:00 GMT+0300 (Москва, стандартное время)',
        'releaseCountry': 'Finland'
      },
      'duration': 11,
      'genre': [
        'Musical',
        'Drama'
      ],
      'description': 'Cras aliquet varius magna, non porta ligula feugiat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    'userDetails': {
      'watchlist': false,
      'alreadyWatched': true,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
  {
    'id': 4,
    'comments': [
      10
    ],
    'filmInfo': {
      'title': 'The Lord of the Rings',
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating': 1.1,
      'poster': 'images/posters/the-dance-of-life.jpg',
      'ageRating': 11,
      'director': 'Tom Ford',
      'writers': [
        'Heinz Herald',
        'Anne Wigton'
      ],
      'actors': [
        'Erich von Stroheim',
        'Dan Duryea'
      ],
      'release': {
        'date': 'Fri Apr 16 2004 00:00:00 GMT+0400 (Москва, летнее время)',
        'releaseCountry': 'Finland'
      },
      'duration': 26,
      'genre': [
        'Western'
      ],
      'description': 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
    },
    'userDetails': {
      'watchlist': true,
      'alreadyWatched': false,
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  },
];

const generateFilms = (count) => Array.from({ length: count }, getRandomArrayElement.bind(null, films));

export { generateFilms };
