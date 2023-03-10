import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this.photo = this._popup.querySelector('.popup__photo');
    this.caption = this._popup.querySelector('.popup__caption')
  }

  open(name, link) {
    super.open();
    this.photo.src = link;
    this.photo.alt = `${name}`;
    this.caption.textContent = name;
  }
}