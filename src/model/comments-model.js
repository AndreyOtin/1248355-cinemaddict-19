import { generateComments } from '../mocks/comments';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = generateComments();

  constructor() {
    super();

    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
  }

  getComments(ids) {
    if (!Array.isArray(ids) || !ids.length) {
      return [];
    }

    return ids.map((id) => {
      const comment = this.#comments.find((it) => it.id === id);

      if (!comment) {
        throw new Error('Can\'t find unexisting comment');
      }

      return comment;
    });
  }

  addComment(event, comment) {
    this.#comments.push(comment);

    this._notify(event, comment);
  }

  deleteComment(event, comment) {
    this.#comments = this.#comments.filter((it) => it.id !== comment.id);

    this._notify(event, comment);
  }

}
