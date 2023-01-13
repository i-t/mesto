const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__text-error_visible'
}; 


const postsContainer = document.querySelector('.posts');
const template = document.querySelector('#post-template');
const popups = document.querySelectorAll('.popup');
const post = template.content.querySelector('.post');
const inputs = document.querySelectorAll(validationConfig.inputSelector);
const errors = document.querySelectorAll('.popup__text-error');

const pageName = document.querySelector('title');
const profileName = document.querySelector('.profile__username');
const profileSubtext = document.querySelector('.profile__subtext');

const popupAddPost = document.querySelector('.popup_add_post');
const popupOpenPhoto = document.querySelector('.popup_open_photo');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupPhoto = popupOpenPhoto.querySelector('.popup__photo');
const popupCaption = popupOpenPhoto.querySelector('.popup__caption')

const addButton = document.querySelector('.profile__add-btn');
const saveButton = document.querySelector('.popup__save-btn');
const editButton = document.querySelector('.profile__edit-btn');
const closeButtons = document.querySelectorAll('.popup__close-btn');

const inputName = document.querySelector('.popup__input_edit_username');
const inputSubtext = document.querySelector('.popup__input_edit_subtext');
const inputPostTitle = document.querySelector('.popup__input_add_title');
const inputPostPhoto = document.querySelector('.popup__input_add_photo');


const createPost = (name, link) => {
  const post = template.content.querySelector('.post').cloneNode(true);
  const postPhoto = post.querySelector('.post__photo');
  const postTitle = post.querySelector('.post__title');
  const postDeleteBtn = post.querySelector('.post__del-btn');
  const postLikeBtn = post.querySelector('.post__like-btn');

  postTitle.textContent = name;
  postPhoto.alt = `${name}`;
  postPhoto.src = link;

  postPhoto.addEventListener('click', () => 
  popupOpenImage(name, link));

  postDeleteBtn.addEventListener('click', () => 
  post.remove());

  postLikeBtn.addEventListener('click', () => 
  postLikeBtn.classList.toggle('post__like-btn_pushed'));
  return post;
}

const renderPost = (name, link) => { 
  postsContainer.prepend(createPost(name, link));
}


function resetInputsErrors() {
  inputPostTitle.value = '';
  inputPostPhoto.value = '';
  inputs.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  })
  errors.forEach((error) => {
    error.classList.remove(validationConfig.errorClass);
  })
}

function closePopup(popup) {
  resetInputsErrors();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandlerEcs);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandlerEcs);
}

function popupOpenImage(name, link) {
  popupPhoto.src = link;
  popupPhoto.alt = name;
  popupCaption.textContent = name;
  openPopup(popupOpenPhoto)
}

function keyHandlerEcs(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  };
}


closeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    closePopup(e.currentTarget.closest('.popup'));
  })
})

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
})

addButton.addEventListener('click', () => {
  openPopup(popupAddPost)
})

popupAddPost.addEventListener('submit', (e) => {
  e.preventDefault();
  title = inputPostTitle.value;
  link = inputPostPhoto.value;
  renderPost(title, link);
  closePopup(popupAddPost);
})

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputSubtext.value = profileSubtext.textContent;
  openPopup(popupEditProfile);
})

popupEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  pageName.textContent = `${inputName.value}` + ' | Mesto Russia';
  profileName.textContent = inputName.value;
  profileSubtext.textContent = inputSubtext.value;
  closePopup(popupEditProfile);
})

initialPosts.forEach(({name, link}) => {
  renderPost(name, link);
})

enableValidation(validationConfig);