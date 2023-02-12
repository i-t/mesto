import { initialPosts } from './initial-posts.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__text-error_visible'
}; 

const postsContainer = document.querySelector('.posts');
const popups = document.querySelectorAll('.popup');

const pageName = document.querySelector('title');
const profileName = document.querySelector('.profile__username');
const profileSubtext = document.querySelector('.profile__subtext');

const popupAddPost = document.querySelector('.popup_add_post');
const popupOpenPhoto = document.querySelector('.popup_open_photo');
const popupEditProfile = document.querySelector('.popup_edit_profile');

const popupPhoto = popupOpenPhoto.querySelector('.popup__photo');
const popupCaption = popupOpenPhoto.querySelector('.popup__caption')

const addButton = document.querySelector('.profile__add-btn');
const editButton = document.querySelector('.profile__edit-btn');

const inputName = document.querySelector('.popup__input_edit_username');
const inputSubtext = document.querySelector('.popup__input_edit_subtext');
const inputPostTitle = document.querySelector('.popup__input_add_title');
const inputPostPhoto = document.querySelector('.popup__input_add_photo');

// const titleValue = inputPostTitle.value;
// const photoValue = inputPostPhoto.value;

const popupAddValidation = new FormValidator(validationConfig, popupAddPost);
const popupEditValidation = new FormValidator(validationConfig, popupEditProfile);


popupAddValidation.enableValidation();
popupEditValidation.enableValidation();


const newPost = (title, photo) => {
  const templateSelector = '#post-template';
  const post = new Card(title, photo, templateSelector, popupOpenImage)
  .createPost();

  return post
}

function renderPost(title, photo) {
  postsContainer.prepend(newPost(title, photo));
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandlerEcs);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlerEcs);
}

function popupOpenImage(title, photo) { 
  popupPhoto.src = photo;
  popupPhoto.alt = `${title}`;
  popupCaption.textContent = title;
  openPopup(popupOpenPhoto)
}

function keyHandlerEcs(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  };
}



popupAddPost.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPost(inputPostTitle.value, inputPostPhoto.value);
  closePopup(popupAddPost);
})

addButton.addEventListener('click', () => {
  inputPostTitle.value = '';
  inputPostPhoto.value = '';
  popupAddValidation.resetInputsErrors();
  openPopup(popupAddPost)
})

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputSubtext.value = profileSubtext.textContent;
  popupEditValidation.resetInputsErrors();
  openPopup(popupEditProfile);
})

popupEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  pageName.textContent = `${inputName.value}` + ' | Mesto Russia';
  profileName.textContent = inputName.value;
  profileSubtext.textContent = inputSubtext.value;
  closePopup(popupEditProfile);
})



popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened') 
    || (evt.target.classList.contains('popup__close-btn')))
    {
      closePopup(popup);
    }
  })
})

initialPosts.forEach(({name, link}) => {
  renderPost(name, link);
});