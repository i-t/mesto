import './index.css';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { CurrentUserCard } from '../components/CurrentUserCard.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  validationConfig,
  userData,
  formUser,
  postsContainer,
  templateSelector,
  popupAddPost,
  popupEditProfile,
  popupEditAvatar,
  avatarButton,
  popupConfirmDelete,
  popupOpenImage,
  addButton,
  editButton
} from '../components/utils/constants.js';

const popupAddValidation = new FormValidator(validationConfig, popupAddPost);
const popupEditValidation = new FormValidator(validationConfig, popupEditProfile);
const popupAvatarValidation = new FormValidator(validationConfig, popupEditAvatar);
const userInfo = new UserInfo(userData);
const popupImage = new PopupWithImage(popupOpenImage);

let currentUserId;

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  'bb7f788f-9a61-4419-94c0-5c9f05b4e131'
);

const newPost = (item) => {
  if (currentUserId === item.owner._id) {
    const currentUserPost = new CurrentUserCard(
        item,
        templateSelector,
        currentUserId,
        handleCardClick,
        handleAddLike,
        handleDeleteLike,
        popupConfirm
      )
      .createCard();
    return currentUserPost
  } else {
    const post = new Card(
        item,
        templateSelector,
        currentUserId,
        handleCardClick,
        handleAddLike,
        handleDeleteLike
      )
      .createCard();
    return post
  }
}

const handleCardClick = (name, link) => {
  popupImage.name = name;
  popupImage.link = link;
  popupImage.open(name, link);
}

const handleAddLike = (id, counter) => {
  return api.addLike(id)
    .then((item) => {
      counter.textContent = item.likes.length;
      
      return item;
    })
}

const handleDeleteLike = (id, counter) => {
  return api.deleteLike(id)
    .then((item) => {
      counter.textContent = item.likes.length;
      
      return item;
    })
}

const popupConfirm = new PopupWithConfirmation(popupConfirmDelete, (id, template) => {
  popupConfirm.waitingResponse();
  api.deleteCard(id)
    .then(() => {
      template.remove();
      template = null;
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupConfirm.setButtonText('Да')
    })
})

const popupAdd = new PopupWithForm(popupAddPost, (formData) => {
  popupAdd.waitingResponse();
  api.createCard(formData)
    .then((item) => {
      postList.addItem(newPost(item));
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.setButtonText('Сохранить')
    })
});

const popupEditInfo = new PopupWithForm(popupEditProfile, (userData) => {
  popupEditInfo.waitingResponse();
  api.setUserData(userData)
    .then(() => {
      userInfo.setUserInfo(userData);
      popupEditInfo.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditInfo.setButtonText('Сохранить')
    })
});

const popupChangeAvatar = new PopupWithForm(popupEditAvatar, (formData) => {
  popupChangeAvatar.waitingResponse();
  api.setUserAvatar(formData)
    .then(() => {
      userInfo.setUserAvatar(formData);
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatar.setButtonText('Сохранить')
    })
});

const postList = new Section((item) => {
  postList.addItem(newPost(item));
}, postsContainer)

popupAdd.setEventListeners();
popupEditInfo.setEventListeners();
popupChangeAvatar.setEventListeners();
popupImage.setEventListeners();

popupAddValidation.enableValidation();
popupEditValidation.enableValidation();
popupAvatarValidation.enableValidation();

addButton.addEventListener('click', () => {
  popupAddValidation.resetInputsErrors();
  popupAdd.open();
})

editButton.addEventListener('click', () => {
  const userValue = userInfo.getUserInfo();
  formUser.name.value = userValue.name;
  formUser.about.value = userValue.about;
  popupEditValidation.resetInputsErrors();
  popupEditInfo.open();
})

avatarButton.addEventListener('click', () => {
  popupAddValidation.resetInputsErrors();
  popupChangeAvatar.open();
})

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([user, items]) => {
    // console.log(user);
    // const currentUser = user;
    currentUserId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    postList.renderItem(items);
  })