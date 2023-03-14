export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link; 
    this._handleCardClick = handleCardClick;
    
    this._template = document.querySelector(templateSelector)
        .content.querySelector('.post').cloneNode(true);
  }

  _setData() {
    this._cardPhoto = this._template.querySelector('.post__photo');
    this._cardTitle = this._template.querySelector('.post__title');

    this._deleteButton = this._template.querySelector('.post__del-btn');
    this._likeButton = this._template.querySelector('.post__like-btn');

    this._cardTitle.textContent = this._name;
    this._cardPhoto.alt = `${this._name}`;
    this._cardPhoto.src = this._link;
  }

  _removeCard() {
    this._template.remove();
    this._template = null; 
  }

  _likeCard() {
    this._likeButton.classList.toggle('post__like-btn_pushed');
  }

  _setListener() {
    this._deleteButton.addEventListener('click', () => {
      this._removeCard()});

    this._likeButton.addEventListener('click', () => {
      this._likeCard()});
    
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  createCard() {
    this._setData();
    this._setListener();

    return this._template;
  }
}