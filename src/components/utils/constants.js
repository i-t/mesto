export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__text-error_visible'
}; 

export const userData = {
  name: document.querySelector('.profile__username'),
  about: document.querySelector('.profile__subtext')
}

export const formUser = {
  name: document.querySelector('.popup__input_edit_username'),
  about: document.querySelector('.popup__input_edit_subtext')
}

export const pageName = document.querySelector('title');

export const postsContainer = document.querySelector('.posts');
export const templateSelector = '#post-template';

export const popupAddPost = document.querySelector('.popup_add_post');
export const popupOpenImage = document.querySelector('.popup_open_photo');
export const popupEditProfile = document.querySelector('.popup_edit_profile');

export const addButton = document.querySelector('.profile__add-btn');
export const editButton = document.querySelector('.profile__edit-btn');

export const inputPostTitle = document.querySelector('.popup__input_add_title');
export const inputPostPhoto = document.querySelector('.popup__input_add_photo');