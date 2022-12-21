const profileName = document.querySelector('.profile__name');
const profileSubtext = document.querySelector('.profile__subtext');

const addButton = document.querySelector('.profile__add-btn');
const editButton = document.querySelector('.profile__edit-btn');


const initialPosts = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Раздел с постами
const postsSection = document.querySelector('.posts'); 
const template = document.querySelector('#post-template');

// Создание постов с массива
const createPost = (name, link) => {
  const post = template.content.querySelector('.post').cloneNode(true);

  post.querySelector('.post__title').textContent = name;
  post.querySelector('.post__photo').alt = `${name}`;
  post.querySelector('.post__photo').src = link;

  post.querySelector('.post__del-btn').addEventListener('click', () => {post.remove();});

  post.querySelector('.post__like-btn').addEventListener('click', () => {
    post.querySelector('.post__like-btn').classList.toggle('post__like-btn_pushed');
  });
  // Лайк с объявлением переменной
  // const likeButton = post.querySelector('.post__like-btn');
  // likeButton.addEventListener('click', () => {
  //   likeButton.classList.toggle('post__like-btn_pushed')
  // });
  

  return post;
}

// Добавление поста
const renderPost = (name, link) => { 
  postsSection.append(createPost(name, link));
}

initialPosts.forEach(({name, link}) => {
  renderPost(name, link);
})




// Попап
const popupAdd = document.querySelector('.popup_add-post');
const popupEdit = document.querySelector('.popup_edit-profile');
const popup = document.querySelector('.popup');
const popupSaveButton = popup.querySelector('.popup__save');
const closeButton = popup.querySelector('.popup__close');

let pageName = document.querySelector('title');
console.log(pageName.textContent);

let nameInput = popup.querySelector('.popup__input_edit_name');
let subtextInput = popup.querySelector('.popup__input_edit_subtext');



function likePost() {
  popup.classList.add('post__like-btn_pushed');
}

function popupOpen() {
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




editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  subtextInput.value = profileSubtext.textContent;
  popupOpen();
});


addButton.addEventListener('click', popupOpen);

closeButton.addEventListener('click', popupClose);

popup.addEventListener('submit', handleFormSubmit);
