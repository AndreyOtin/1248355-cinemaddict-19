import Observable from '../framework/observable';
import { adaptToClient } from '../utils/adapt';

export default class CommentsModel extends Observable {
  #comments;
  #commentsApiService;

  constructor(commentsApiService) {
    super();

    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  getComments(event, film) {
    return this.#commentsApiService.getComments(film)
      .then((response) => {
        this.#comments = response.map((comment) => adaptToClient(comment));

        this._notify(event, this.#comments);
      });
  }

  addComment(event, { film, comment }) {
    return this.#commentsApiService.addComment(film, comment)
      .then((response) => {
        const updatedFilm = adaptToClient(response.movie);

        this.#comments = response.comments.map((it) => adaptToClient(it));

        this._notify(event, { film: updatedFilm, comments: this.#comments });
      });
  }

  deleteComment(event, id) {
    return this.#commentsApiService.deleteComment(id)
      .then(() => {
        this.#comments = this.#comments.filter((comment) => comment.id !== id);

        this._notify(event, this.#comments);
      });

  }

}
