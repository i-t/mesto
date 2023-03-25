import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(element, remove) {
    super(element);
    this._remove = remove;
  }

  open(id, template) {
    super.open();
    this._id = id;
    this._template = template;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._remove(this._id, this._template)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }
}