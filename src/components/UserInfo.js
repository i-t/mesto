export class UserInfo {
  constructor ({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    }
    return userInfo;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;

    document.querySelector('title')
      .textContent = `${name}` + ' | Mesto Russia';
  }
}