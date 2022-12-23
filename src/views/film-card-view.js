import { DateFormat, DurationFormat } from '../consts/dayjs-formats.js';
import { pluralRuleToCommentWord } from '../consts/plural-rules.js';
import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, formatDuration, getPluralWord } from '../utils/format.js';

const createFilmCardTemplate = (film) => {
  const { comments, filmInfo } = film;
  const { description, poster, title, totalRating, genre, release, duration } = filmInfo;
  const { date } = release;

  const releaseDate = formatDate(date, DateFormat.YEAR);
  const movieDuration = formatDuration(duration, DurationFormat);
  const commentWord = getPluralWord(comments.length, pluralRuleToCommentWord);
  const commentsCount = comments.length ? comments.length : '';

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${movieDuration}</span>
          <span class="film-card__genre">${genre.join(' ')}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${commentsCount} ${commentWord}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};

export default class FilmCardView extends AbstractView {
  #film;
  #handleClick;

  constructor({ film, clickHandler }) {
    super();
    this.#handleClick = clickHandler;
    this.#film = film;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
