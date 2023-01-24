import ApiService from '../framework/api-service';
import { Method } from '../consts/api';
import { adaptToServer } from '../utils/adapt';

export default class FilmsApiService extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  get films() {
    return this._load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(ApiService.parseResponse);
  }
}
