const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');

let profileName = profile.querySelector('.profile__name');
let profileSubtext = profile.querySelector('.profile__subtext');
let profileEditButton = profile.querySelector('.profile__edit-btn');

let popupSaveButton = popup.querySelector('.popup__save');
let popupCloseButton = popup.querySelector('.popup__close');

let pageName = document.querySelector('title');
console.log(pageName.textContent);

let nameInput = popup.querySelector('.popup__input_edit_name');
let subtextInput = popup.querySelector('.popup__input_edit_subtext');

let likeButtons = document.querySelectorAll('.post__like-btn');


function popupOpen() {
  nameInput.value = profileName.textContent;
  subtextInput.value = profileSubtext.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  pageName.textContent = nameInput.value + ' | Mesto Russia';
  profileName.textContent = nameInput.value;
  profileSubtext.textContent = subtextInput.value;
  popupClose();
}


profileEditButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

popup.addEventListener('submit', handleFormSubmit);