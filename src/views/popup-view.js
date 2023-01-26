import { EMOTIONS, SHAKE_ANIMATION_TIMEOUT, SHAKE_CLASS_NAME, } from '../consts/app.js';
import { DateFormat, DurationFormat } from '../consts/dayjs-formats.js';
import { pluralRuleToCommentWord, pluralRuleToGenreWord } from '../consts/plural-rules.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { ActiveButtonClassName, Code, DEBOUNCE_DELAY, DEFAULT_SCROLL_POSITION, SCROLL_X_POSITION } from '../consts/dom';
import { UserAction } from '../consts/observer';
import he from 'he';
import { debounce, runOnKeys } from '../utils/dom';
import {
  formatDate,
  formatDuration,
  getPluralWord,
  getRelativeTime,
  makeFirstLetterUpperCase
} from '../utils/format.js';

const createEmojiImageTemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`;

const createEmojisTemplate = (emojis, emotion, isSubmitting) => emojis.map((emoji) => `
    <input ${isSubmitting ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}"
      value="${emoji}" ${emotion === emoji ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>
  `).join('');

const createCommentsTemplate = (comments, isDeleting, buttonId) => comments.map((it) => {
  const { emotion, author, comment, date, id } = it;

  const relativeCommentTime = getRelativeTime(date);
  const emojiImageTemplate = emotion ? createEmojiImageTemplate(emotion) : '';
  const buttonText = isDeleting && buttonId === id ? 'Deleting' : 'Delete';

  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        ${emojiImageTemplate}
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${relativeCommentTime}</span>
          <button ${isDeleting && buttonId === id ? 'disabled' : ''} data-id="${id}" class="film-details__comment-delete">${buttonText}</button>
        </p>
      </div>
    </li>
  `;
}).join('');

const createGenreTemplate = (genres) => genres.map((genre) => `
    <span class="film-details__genre">${genre}</span>
  `).join('');

const createPopupTemplate = (state) => {
  const { comments, film, comment, isComments, isDeleting, isSubmitting, deletingCommentId } = state;
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
  const genreWord = getPluralWord(genre.length, pluralRuleToGenreWord);
  const commentWord = makeFirstLetterUpperCase(getPluralWord(comments?.length, pluralRuleToCommentWord));

  const genreTemplate = createGenreTemplate(genre);
  const emojisTemplate = createEmojisTemplate(EMOTIONS, comment.emotion, isSubmitting);
  const commentsTemplate = comments && comments.length ? createCommentsTemplate(comments, isDeleting, deletingCommentId) : '';
  const emojiImageTemplate = comment.emotion ? createEmojiImageTemplate(comment.emotion) : '';

  const commentsCount = comments?.length || '';

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
                <textarea ${isSubmitting ? 'disabled' : ''} class="film-details__comment-input" placeholder="${isComments ? 'Select reaction below and write comment here' : 'Error happened while loading comments'}"
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
  #handleFormSubmit;
  #formElement;
  #commentsContainerElement;
  #filterControlButtonsContainer;
  #handleFilterControlButtonClick;
  #handleDeleteButtonClick;

  constructor({
    comments,
    film,
    onCloseButtonClick,
    onFormSubmit,
    onFilterControlButtonClick,
    onDeleteButtonClick
  }) {
    super();

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFilterControlButtonClick = onFilterControlButtonClick;
    this.#handleDeleteButtonClick = onDeleteButtonClick;

    this._setState({
      comments,
      film,
      comment: { comment: '', emotion: '' },
      deletingCommentId: '',
      scrollPosition: DEFAULT_SCROLL_POSITION,
      isComments: !!comments,
      isDeleting: false,
      isSubmitting: false
    });
    this._restoreHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  _restoreHandlers() {
    this.#formElement = this.element.querySelector('.film-details__new-comment');
    this.#commentsContainerElement = this.element.querySelector('.film-details__comments-list');
    this.#filterControlButtonsContainer = this.element.querySelector('.film-details__controls');

    this.#commentsContainerElement.addEventListener('click', this.#deleteButtonClickHandler);
    this.#filterControlButtonsContainer.addEventListener('click', this.#filterControlButtonClickHandler);
    this.#formElement.addEventListener('click', this.#emojiButtonClickHandler);
    this.#formElement.addEventListener('input', debounce(this.#commentInputHandler, DEBOUNCE_DELAY));

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
    this.element.addEventListener('scroll', debounce(() => {
      this._setState({ scrollPosition: this.element.scrollTop });
    }, DEBOUNCE_DELAY));

    runOnKeys(
      this.#formElement,
      this.#formSubmitHandler,
      Code.CONTROL_LEFT, Code.ENTER);
  }

  #setScroll() {
    this.element.scrollTo(SCROLL_X_POSITION, this._state.scrollPosition);
  }

  #restoreTypedText() {
    if (this._state.comment.comment) {
      this.#formElement.comment.value = this._state.comment.comment;
    }
  }

  #shakeElement(cb, element) {
    element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      element.classList.remove(SHAKE_CLASS_NAME);
      cb?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shake(callback, action) {
    switch (action) {
      case UserAction.ADD_COMMENT:
        this.#shakeElement(callback, this.#formElement);
        break;
      case UserAction.TOGGLE_POPUP_FILTER_CONTROL:
        this.#shakeElement(callback, this.#filterControlButtonsContainer);
        break;
      case UserAction.DELETE_COMMENT:
        this.#shakeElement(callback, this.#commentsContainerElement);
    }
  }

  updateFilterControlButtonHandler(handler) {
    this.#handleFilterControlButtonClick = handler;
  }

  update(film, comments) {
    const update = this._state.isSubmitting
      ? { film, comments, comment: { comment: '', emotion: '' }, isSubmitting: false, isComments: !!comments }
      : { film, comments, isDeleting: false, isComments: !!comments };

    this.updateElement(update);
    this.restoreElementState();
  }

  restoreElementState() {
    this.#setScroll();
    this.#restoreTypedText();
  }

  #filterControlButtonClickHandler = (evt) => {
    if (evt.target.matches('button')) {
      this.#handleFilterControlButtonClick(evt.target.dataset.type, UserAction.TOGGLE_POPUP_FILTER_CONTROL);
    }
  };

  #emojiButtonClickHandler = (evt) => {
    if (evt.target.matches('input')) {
      this.updateElement({ comment: { ...this._state.comment, emotion: evt.target.value } });
      this.restoreElementState();
    }
  };

  #commentInputHandler = (evt) => {
    if (evt.target.matches('textarea')) {
      this._setState({ comment: { ...this._state.comment, comment: evt.target.value.trim() } });
    }
  };

  #formSubmitHandler = () => {
    this.#handleFormSubmit({ ...this._state.comment });
  };

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  #deleteButtonClickHandler = (evt) => {
    if (evt.target.matches('button')) {
      this._setState({ deletingCommentId: evt.target.dataset.id });
      this.#handleDeleteButtonClick(evt.target.dataset.id);
    }
  };
}
