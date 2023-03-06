import { Popup } from './Popup.js';
import { validationConfig } from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._popup = selector;
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputs = this._popup.querySelectorAll(validationConfig.inputSelector);
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}