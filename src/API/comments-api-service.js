import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  getComments(film) {
    return this._load({ url: `comments/${film.id}` }).then(ApiService.parseResponse);
  }
}
