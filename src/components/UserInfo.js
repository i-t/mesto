export class UserInfo {
  constructor ({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    document.querySelector('title')
      .textContent = `${name}` + ' | Mesto Russia';
  }
}