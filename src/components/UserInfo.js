export class UserInfo {
  constructor ({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo({ name, about }) {
    return {
      name: name.textContent,
      about: about.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    document.querySelector('title')
      .textContent = `${name}` + ' | Mesto Russia';
  }
}