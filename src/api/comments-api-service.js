import ApiService from '../framework/api-service';
import { Method } from '../consts/api';

export default class CommentsApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  getComments(film) {
    return this._load({ url: `comments/${film.id}` })
      .then(ApiService.parseResponse);
  }

  addComment(film, comment) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(ApiService.parseResponse);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });
  }
}
