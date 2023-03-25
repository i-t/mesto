import { Popup } from './Popup.js';
import { validationConfig } from './utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll(validationConfig.inputSelector);
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name]
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._formSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }
}