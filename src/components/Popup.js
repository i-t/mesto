export class Popup {
  constructor(element) {
    this._popup = element;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened') 
      || (e.target.classList.contains('popup__close-btn')))
      {
        this.close();
      }
    })
  }
}