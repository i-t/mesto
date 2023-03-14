import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialPosts } from '../components/utils/initial-posts.js';
import {
  validationConfig,
  userData,
  formUser,
  postsContainer,
  templateSelector,
  popupAddPost,
  popupEditProfile,
  popupOpenImage,
  addButton,
  editButton
} from '../components/utils/constants.js';

const popupAddValidation = new FormValidator(validationConfig, popupAddPost);
const popupEditValidation = new FormValidator(validationConfig, popupEditProfile);
const userInfo = new UserInfo(userData);
const popupImage = new PopupWithImage(popupOpenImage);

const newPost = (item) => {
  const post = new Card(item, templateSelector, handleCardClick)
    .createCard();
  return post
}

const handleCardClick = (name, link) => {
  popupImage.name = name;
  popupImage.link = link;
  popupImage.open(name, link);
}

const popupAdd = new PopupWithForm(popupAddPost, (formData) => {
  postList.addItem(newPost(formData));
  popupAdd.close();
});

const popupEdit = new PopupWithForm(popupEditProfile, (userData) => {
  userInfo.setUserInfo(userData);
});

const postList = new Section((item) => {
  postList.addItem(newPost(item));
}, postsContainer)

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupImage.setEventListeners();

popupAddValidation.enableValidation();
popupEditValidation.enableValidation();

addButton.addEventListener('click', () => {
  popupAddValidation.resetInputsErrors();
  popupAdd.open();
})

editButton.addEventListener('click', () => {
  const userValue = userInfo.getUserInfo();
  formUser.name.value = userValue.name;
  formUser.about.value = userValue.about;
  popupEditValidation.resetInputsErrors();
  popupEdit.open();
})

postList.renderItem(initialPosts);
