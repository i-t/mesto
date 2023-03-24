import { Card } from "./Card.js";

export class CurrentUserCard extends Card {
  constructor(item, templateSelector, currentUserId, handleCardClick, handleAddLike, handleDeleteLike, popupConfirm) {
    super(item, templateSelector, currentUserId, handleCardClick, handleAddLike, handleDeleteLike);
    this._popupConfirm = popupConfirm;
  }

  _deletableCard() {
    this._deleteButton = this._template.querySelector('.post__del-btn');
  }

  _setListener() {
    super._setListener();
    this._deleteButton.addEventListener('click', () => {
      this._popupConfirm.setEventListeners(this._id, this._template);
      this._popupConfirm.open();
    });
  }
}