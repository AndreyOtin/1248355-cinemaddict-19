import AbstractView from '../framework/view/abstract-view';
import { getUserRank } from '../utils/format';

const createUserProfileTemplate = (watchedFilmsCount) => {
  const userRank = getUserRank(watchedFilmsCount);

  const profileTemplate = userRank ? `<p class="profile__rating">${userRank}</p>` : '';

  return `
    <section class="header__profile profile">
      ${profileTemplate}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};

export default class UserProfileView extends AbstractView {
  #watchedFilmsCount;

  constructor({ watchedFilmsCount }) {
    super();

    this.#watchedFilmsCount = watchedFilmsCount;
  }

  get template() {
    return createUserProfileTemplate(this.#watchedFilmsCount);
  }


}
