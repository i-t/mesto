export class Card {
  constructor(title, photo, templateSelector, popupOpenImage) {
    this._title = title;
    this._photo = photo; 
    
    this._popupOpenImage = popupOpenImage;
    this._template = document.querySelector(templateSelector)
        .content.querySelector('.post').cloneNode(true);
  }

  _setData() {
    this._postPhoto = this._template.querySelector('.post__photo');
    this._postTitle = this._template.querySelector('.post__title');

    this._deleteButton = this._template.querySelector('.post__del-btn');
    this._likeButton = this._template.querySelector('.post__like-btn');

    this._postTitle.textContent = this._title;
    this._postPhoto.alt = `${this._title}`;
    this._postPhoto.src = this._photo;

    console.log(this._title);
    console.log(this._photo);
  }

  _removePost() {
    this._template.remove();
    this._template = null; 
  }

  _likePost() {
    this._likeButton.classList.toggle('post__like-btn_pushed');
  }

  _setListener() {
    
    this._deleteButton.addEventListener('click', () => {
      this._removePost()});

    this._likeButton.addEventListener('click', () => {
      this._likePost()});

    this._postPhoto.addEventListener('click', () => {
      this._popupOpenImage(this._title, this._photo)});
}

  createPost() {
    this._setData();
    this._setListener();

    return this._template;
  }
}