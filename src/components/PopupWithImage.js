import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(name, link, selector) {
    super(selector);
    this._name = name;
    this._link = link;
    this.photo = this._popup.querySelector('.popup__photo');
    this.caption = this._popup.querySelector('.popup__caption')
  }

  open() {
    super.open();
    this.photo.src = this._link;
    this.photo.alt = `${this._name}`;
    this.caption.textContent = this._name;
  }
}