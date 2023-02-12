export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }
  
   _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _toggleButtonState() {
    this.submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput()) {
      this.submitButton.classList.add(this._config.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this._config.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetInputsErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)});

    this._toggleButtonState();
  };
}