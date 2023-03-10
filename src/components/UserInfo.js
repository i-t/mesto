import { validationConfig, userData } from './utils/constants.js';

export class UserInfo {
  constructor ({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo(formData) {
    formData.name.value = this._name.textContent;
    formData.about.value = this._about.textContent;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
    document.querySelector('title')
      .textContent = `${name}` + ' | Mesto Russia';
  }
}