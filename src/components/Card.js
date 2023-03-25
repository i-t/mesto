export class Card {
  constructor(
    item,
    userId,
    templateSelector,
    popupConfirm,
    handleCardClick,
    handleAddLike,
    handleDeleteLike
  ) 
  {
    this._id = item._id;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardOwnerId = item.owner._id
    this._userId = userId;
    
    this._popupConfirm = popupConfirm;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleCardClick = handleCardClick;

    this._isOwner = item.owner._id === userId;
    this._template = document.querySelector(templateSelector)
        .content.querySelector('.post').cloneNode(true);
    this._cardPhoto = this._template.querySelector('.post__photo');
    this._cardTitle = this._template.querySelector('.post__title');
    this._likeButton = this._template.querySelector('.post__like-btn');
    this._deleteButton = this._template.querySelector('.post__del-btn');
  }

  _deletableCard(){
    
  }

  _toggleAddLike() {
    this._likeButton.classList.add('post__like-btn_pushed');
  }

  _toggleDeleteLike() {
    this._likeButton.classList.remove('post__like-btn_pushed');
  }

  _isLiked() {
    if (this._currentUserLike()) {
      this._toggleAddLike();
      return true;
    } else {
      return false;
    }
  }

  _currentUserLike() {
    return this._likes.some(like => like._id === this._userId);
  }
  
  _likeCard() {
    if (!this._isLiked()) {
      this._handleAddLike(this._id, this._likeButton)
        .then((item) => {
          this._likes = item.likes;
          this._toggleAddLike();
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._handleDeleteLike(this._id, this._likeButton)
        .then((item) => {
          this._likes = item.likes;
          this._toggleDeleteLike();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  _setData() {
    this._likeButton.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardPhoto.alt = `${this._name}`;
    this._cardPhoto.src = this._link;
    
    this._isLiked();
    this._deletableCard();
  }

  _setListener() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._popupConfirm.open(this._id, this._template);
      });
    }
  }

  createCard() {
    this._setData();
    this._setListener();

    return this._template;
  }
}