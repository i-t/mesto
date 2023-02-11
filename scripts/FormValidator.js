export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _showInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  }

  _hideInputError(config, formElement, inputElement) {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
  
   _checkInputValidity(config, formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(config, formElement, inputElement);
    } else {
      this._showInputError(config, formElement, inputElement);
    }
  }

  _toggleButtonState(config, formElement, inputList) {
    this.submitButton = formElement.querySelector(config.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this.submitButton.classList.add(config.inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(config.inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }

  _setEventListeners(config, formElement) {
    this.inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this.submitButton = formElement.querySelector(config.submitButtonSelector);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(config, formElement, inputElement);
        this._toggleButtonState(config, formElement, this.inputList);
      })
    })
  }

  enableValidation(config, formElement) {
    this._setEventListeners(config, formElement);
  }

  resetInputsErrors(config) {
    const errors = document.querySelectorAll('.popup__text-error');
    const inputs = document.querySelectorAll(config.inputSelector);

    const inputPostTitle = document.querySelector('.popup__input_add_title');
    const inputPostPhoto = document.querySelector('.popup__input_add_photo');

    errors.forEach((error) => {error.classList.remove(config.errorClass)});
    inputs.forEach((input) => {input.classList.remove(config.inputErrorClass)});
    
    inputPostTitle.value = '';
    inputPostPhoto.value = '';
  };
}