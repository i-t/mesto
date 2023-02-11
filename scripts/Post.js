export class Post {
  constructor(title, photo, popupOpenImage) {
    this._title = title;
    this._photo = photo;
    this._popupOpenImage = popupOpenImage;
  }

  _getTemplate() {
    const template = document
    .querySelector('#post-template').content
    .querySelector('.post').cloneNode(true);
    
    return template;
  }

  _setData() {
    this.postPhoto = this._postCard.querySelector('.post__photo');
    this.postTitle = this._postCard.querySelector('.post__title');

    this.postTitle.textContent = this._title;
    this.postPhoto.alt = `${this._title}`;
    this.postPhoto.src = this._photo;
  }

  _removePost() {
    this._postCard.remove();
    this._postCard = null; 
  }

  _setListener() {
    this.deleteButton = this._postCard.querySelector('.post__del-btn');
    this.deleteButton.addEventListener('click', () => {this._removePost()});

    this.likeButton = this._postCard.querySelector('.post__like-btn');
    this.likeButton.addEventListener('click', () => 
    this.likeButton.classList.toggle('post__like-btn_pushed'));

    this._postImage.addEventListener('click', () => {
    this._popupOpenImage(this._title, this._photo)});
  }

  createPost() {
    this._postCard = this._getTemplate();
    this._postImage = this._postCard.querySelector('.post__photo');

    this._setData();
    this._setListener();

    return this._postCard;
  }
}