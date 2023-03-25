export class UserInfo {
  constructor ({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._pageName = document.querySelector('title');
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
    this._pageName.textContent = `${name}` + ' | Mesto Russia';
  }
}