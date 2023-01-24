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
      })
      .catch((err) => {
        this.#comments = [];
        throw err;
      });
  }

  addComment(event, comment) {
    this.#comments.push(comment);
  }

  deleteComment(event, comment) {
    this.#comments = this.#comments.filter((it) => it.id !== comment.id);
  }

}
