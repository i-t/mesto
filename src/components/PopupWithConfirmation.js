import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(element, remove) {
    super(element);
    this._remove = remove;
  }

  setEventListeners(id, template) {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._remove(id, template);
    });
  }
}