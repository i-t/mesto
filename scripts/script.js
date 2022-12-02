const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const post = document.querySelector('.post')

let profileName = profile.querySelector('.profile__name');
let profileSubtext = profile.querySelector('.profile__subtext');
let profileEditButton = profile.querySelector('.profile__edit-btn');

let popupSaveButton = popup.querySelector('.popup__save');
let popupCloseButton = popup.querySelector('.popup__close');

let nameInput = popup.querySelector('.popup__input_type-name');
let subtextInput = popup.querySelector('.popup__input_type-subtext');

let likeButtons = document.querySelectorAll('.post__like-btn'); // BONUS

console.log(likeButtons);


function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtext.textContent = subtextInput.value;
  popupClose();
}

profileEditButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

popup.addEventListener('submit', handleFormSubmit);

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function likePost() {
    likeButtons[i].classList.toggle('post__like-btn_pushed');
  });
}
