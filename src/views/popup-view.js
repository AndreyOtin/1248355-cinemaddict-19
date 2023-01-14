import { ActiveButtonClassName, DEBOUNCE_DELAY, EMOTIONS, SCROLL_X_POSITION } from '../consts/app.js';
import { formatDate, formatDuration, getPluralWord, makeFirstLetterUpperCase } from '../utils/format.js';
import { DateFormat, DurationFormat } from '../consts/dayjs-formats.js';
import { pluralRuleToCommentWord, pluralRuleToGenreWord } from '../consts/plural-rules.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { runOnKeys } from '../utils/dom';
import { debounce } from '../utils/common';

const createEmojiImageTemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`;

const createEmojisTemplate = (emojis) => emojis.map((emoji) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}"
      value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>
  `).join('');

const createCommentsTemplate = (comments) => comments.map((it) => {
  const { emotion, author, comment, date } = it;

  const commentDay = formatDate(date, DateFormat.WITH_TIME);
  const emojiImageTemplate = createEmojiImageTemplate(emotion);

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emojiImageTemplate}
      </span>
      <div>
        <p class="film-details__comment-text">${comment}t</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDay}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `;
}).join('');

const createGenreTemplate = (genres) => genres.map((genre) => `
    <span class="film-details__genre">${genre}</span>
  `).join('');

const createPopupTemplate = (comments, film, comment) => {
  const { filmInfo, userDetails } = film;
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const {
    description,
    ageRating,
    alternativeTitle,
    poster,
    title,
    totalRating,
    genre,
    release,
    duration,
    director,
    actors,
    writers
  } = filmInfo;
  const { date, releaseCountry } = release;

  const releaseDate = formatDate(date, DateFormat.FULL);
  const movieDuration = formatDuration(duration, DurationFormat);
  const genreTemplate = createGenreTemplate(genre);
  const commentsTemplate = createCommentsTemplate(comments);
  const emojisTemplate = createEmojisTemplate(EMOTIONS);
  const emojiImageTemplate = comment?.emotion ? createEmojiImageTemplate(comment.emotion) : '';
  const genreWord = getPluralWord(genre.length, pluralRuleToGenreWord);
  const commentWord = makeFirstLetterUpperCase(getPluralWord(comments.length, pluralRuleToCommentWord));
  const commentsCount = comments.length || '';

  return `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${movieDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreWord}</td>
                  <td class="film-details__cell">${genreTemplate}</td>
                </tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <button data-type="watchlist" type="button" class="film-details__control-button ${watchlist ? ActiveButtonClassName.POPUP : ''} film-details__control-button--watchlist"
             id="watchlist" name="watchlist">Add to watchlist</button>
            <button data-type="alreadyWatched" type="button"
             class="film-details__control-button ${alreadyWatched ? ActiveButtonClassName.POPUP : ''} film-details__control-button--watched"
              id="watched" name="watched">Already watched</button>
            <button data-type="favorite" type="button" class="film-details__control-button ${favorite ? ActiveButtonClassName.POPUP : ''}  film-details__control-button--favorite"
             id="favorite" name="favorite">Add to favorites</button>
           </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">${commentWord} <span class="film-details__comments-count">${commentsCount}</span></h3>
            <ul class="film-details__comments-list">${commentsTemplate}</ul>
            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label">${emojiImageTemplate}</div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                 name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">${emojisTemplate}</div>
            </form>
          </section>
        </div>
      </div>
    </section>
  `;
};

export default class PopupView extends AbstractStatefulView {
  #handleCloseButtonClick;
  #handleFavoriteButtonClick;
  #handelWatchListButtonClick;
  #handelHistoryButtonClick;
  #handleFormSubmit;
  #formElement;

  constructor({
    scrollPosition,
    comments,
    film,
    closeButtonClickHandler,
    favoriteButtonClickHandler,
    historyButtonClickHandler,
    watchListButtonClickHandler,
    formSubmitHandler
  }) {
    super();
    this.#handleCloseButtonClick = closeButtonClickHandler;
    this.#handleFavoriteButtonClick = favoriteButtonClickHandler;
    this.#handelWatchListButtonClick = watchListButtonClickHandler;
    this.#handelHistoryButtonClick = historyButtonClickHandler;
    this.#handleFormSubmit = formSubmitHandler;
    this._setState({ comments, film, scrollPosition });
    this._restoreHandlers();
  }

  get template() {
    return createPopupTemplate(this._state.comments, this._state.film, this._state.comment);
  }

  get scrollValue() {
    return this._state.scrollPosition;
  }

  setScroll() {
    this.element.scrollTo(SCROLL_X_POSITION, this.scrollValue);
  }

  #restoreTypedText() {
    if (this._state.comment.comment) {
      this.#formElement.comment.value = this._state.comment.comment;
    }
  }

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  _restoreHandlers() {
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteButtonClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListButtonClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#historyButtonClickHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.addEventListener('scroll', debounce(() => {
      this._setState({ scrollPosition: this.element.scrollTop });
    }, DEBOUNCE_DELAY));

    this.#formElement = this.element.querySelector('.film-details__new-comment');
    this.#formElement.addEventListener('click', this.#emojiButtonClickHandler);
    this.#formElement.addEventListener('input', debounce(this.#commentInputHandler, DEBOUNCE_DELAY));
    runOnKeys(
      this.#formElement,
      this.#formSubmitHandler,
      'ControlLeft', 'Enter');
  }

  #favoriteButtonClickHandler = (evt) => {
    this.updateElement({
      film: {
        ...this._state.film,
        userDetails: {
          ...this._state.film.userDetails,
          favorite: !this._state.film.userDetails.favorite
        }
      }
    });
    this.setScroll();

    this.#handleFavoriteButtonClick(evt.target.dataset.type);
  };

  #historyButtonClickHandler = (evt) => {
    this.updateElement({
      film: {
        ...this._state.film,
        userDetails: {
          ...this._state.film.userDetails,
          alreadyWatched: !this._state.film.userDetails.alreadyWatched
        }
      }
    });
    this.setScroll();

    this.#handleFavoriteButtonClick(evt.target.dataset.type);
  };

  #watchListButtonClickHandler = (evt) => {
    this.updateElement({
      film: {
        ...this._state.film,
        userDetails: {
          ...this._state.film.userDetails,
          watchlist: !this._state.film.userDetails.watchlist
        }
      }
    });
    this.setScroll();

    this.#handleFavoriteButtonClick(evt.target.dataset.type);
  };

  #emojiButtonClickHandler = (evt) => {
    if (evt.target.matches('input')) {
      this.updateElement({ comment: { ...this._state.comment, emotion: evt.target.value } });
      this.setScroll();
      this.#restoreTypedText();
    }
  };

  #commentInputHandler = (evt) => {
    if (evt.target.matches('textarea')) {
      this._setState({ comment: { ...this._state.comment, comment: evt.target.value } });
    }
  };

  #formSubmitHandler = () => {
    this.#handleFormSubmit();
  };
}
