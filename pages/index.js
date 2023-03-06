import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { initialPosts } from '../scripts/utils/initial-posts.js';
import {
  validationConfig,
  userData,
  formUser,
  postsContainer,
  templateSelector,
  popupAddPost,
  popupEditProfile,
  addButton,
  editButton
} from '../scripts/utils/constants.js';

const popupAddValidation = new FormValidator(validationConfig, popupAddPost);
const popupEditValidation = new FormValidator(validationConfig, popupEditProfile);
const userInfo = new UserInfo(userData);

const newPost = (item) => {
  const post = new Card(item, templateSelector, handleCardClick)
    .createCard();
  return post
}

const handleCardClick = (name, link, image) => {
  const popupImage = new PopupWithImage(name, link, image);
      popupImage.setEventListeners();
      popupImage.open();
}

const popupAdd = new PopupWithForm(popupAddPost, (formData) => {
  postList.addItem(newPost(formData));
  popupAdd.close();
});

const popupEdit = new PopupWithForm(popupEditProfile, (userData) => {
  userInfo.setUserInfo(userData);
});

const postList = new Section({
  items: initialPosts,
  renderer: (item) => {
    postList.addItem(newPost(item));
   }
  }, postsContainer
)

popupAdd.setEventListeners();
popupEdit.setEventListeners();

popupAddValidation.enableValidation();
popupEditValidation.enableValidation();

addButton.addEventListener('click', () => {
  popupAddValidation.resetInputsErrors();
  popupAdd.open();
})

editButton.addEventListener('click', () => {
  formUser.name.value = userData.name.textContent;
  formUser.about.value = userData.about.textContent;
  popupEditValidation.resetInputsErrors();
  popupEdit.open();
})

postList.renderItem();