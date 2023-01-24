import { DateFormat, DurationFormat } from '../consts/dayjs-formats.js';
import { pluralRuleToCommentWord } from '../consts/plural-rules.js';
import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, formatDuration, getDottedDescription, getPluralWord } from '../utils/format.js';
import { ActiveButtonClassName } from '../consts/dom';

const createFilmCardTemplate = (film) => {
  const { comments, filmInfo, userDetails } = film;
  const { description, poster, title, totalRating, genre, release, duration } = filmInfo;
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const { date } = release;

  const releaseDate = formatDate(date, DateFormat.YEAR);
  const movieDuration = formatDuration(duration, DurationFormat);
  const dottedDescription = getDottedDescription(description);
  const commentWord = getPluralWord(comments.length, pluralRuleToCommentWord);
  const commentsCount = comments.length || '';

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
        <p class="film-card__description">${dottedDescription}</p>
        <span class="film-card__comments">${commentsCount} ${commentWord}</span>
      </a>
      <div class="film-card__controls">
        <button data-type="watchlist" class="film-card__controls-item ${watchlist ? ActiveButtonClassName.FILM_CARD : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button data-type="alreadyWatched" class="film-card__controls-item ${alreadyWatched ? ActiveButtonClassName.FILM_CARD : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button data-type="favorite" class="film-card__controls-item ${favorite ? ActiveButtonClassName.FILM_CARD : ''}  film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
};

export default class FilmCardView extends AbstractView {
  #film;
  #handleFilmCardClick;
  #handleControlButtonClick;

  constructor({
    film,
    onFilmCardClick,
    onControlButtonClick
  }) {
    super();

    this.#film = film;
    this.#handleFilmCardClick = onFilmCardClick;
    this.#handleControlButtonClick = onControlButtonClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchListButtonClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#historyButtonClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #filmCardClickHandler = () => {
    this.#handleFilmCardClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    this.#handleControlButtonClick(evt.target.dataset.type);
  };

  #historyButtonClickHandler = (evt) => {
    this.#handleControlButtonClick(evt.target.dataset.type);
  };

  #watchListButtonClickHandler = (evt) => {
    this.#handleControlButtonClick(evt.target.dataset.type);
  };
}
