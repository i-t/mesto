const initialPosts = [
  
  {
    name: 'Эвенкия',
    link: './images/01_krasavia_evenkya.jpg'
  },
  {
    name: 'Аэропорт Горный',
    link: './images/09_krasavia-tura-gornyi.jpg'
  },
  {
    name: 'Тайга',
    link: './images/07_krasavia_taiga.jpg'
  },
  {
    name: 'Тутончаны',
    link: './images/55_krasavia-tutonchani.jpg'
  },
  {
    name: 'Река Иритка',
    link: './images/64_krasavia_iritka_river.jpg'
  },
  {
    name: 'КрасАвиа',
    link: './images/00_krasavia.jpg'
  }
]; 

const postsContainer = document.querySelector('.posts');
const template = document.querySelector('#post-template');
const popups = document.querySelectorAll('.popup');
const post = template.content.querySelector('.post')

const pageName = document.querySelector('title');
const profileName = document.querySelector('.profile__name');
const profileSubtext = document.querySelector('.profile__subtext');

const popupAddPost = document.querySelector('.popup_add_post');
const popupOpenPhoto = document.querySelector('.popup_open_photo');
const popupEditProfile = document.querySelector('.popup_edit_profile');

const addButton = document.querySelector('.profile__add-btn');
const saveButton = document.querySelector('.popup__save-btn');
const editButton = document.querySelector('.profile__edit-btn');
const closeButtons = document.querySelectorAll('.popup__close-btn');

const inputName = document.querySelector('.popup__input_edit_name');
const inputSubtext = document.querySelector('.popup__input_edit_subtext');
const inputPostTitle = document.querySelector('.popup__input_add_title');
const inputPostPhoto = document.querySelector('.popup__input_add_photo');


const createPost = (name, link) => {
  const post = template.content.querySelector('.post').cloneNode(true);
  
  post.querySelector('.post__title').textContent = name;
  post.querySelector('.post__photo').alt = `${name}`;
  post.querySelector('.post__photo').src = link;

  // Открыть
  post.querySelector('.post__photo').addEventListener('click', () => {
    popupOpenPhoto.querySelector('.popup__photo').src = post.querySelector('.post__photo').src;
    popupOpenPhoto.querySelector('.popup__caption').textContent = post.querySelector('.post__title').textContent;
    openPopup(popupOpenPhoto)
  });

  // Удалить
  post.querySelector('.post__del-btn').addEventListener('click', () => {
    post.remove()
  });

  // Лайкнуть
  post.querySelector('.post__like-btn').addEventListener('click', () => {
    post.querySelector('.post__like-btn').classList.toggle('post__like-btn_pushed')
  });

  return post;
}

const renderPost = (name, link) => { 
  postsContainer.prepend(createPost(name, link));
}

initialPosts.forEach(({name, link}) => {
  renderPost(name, link);
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((x) => {
  x.addEventListener('click', (e) => {
    closePopup(e.currentTarget.closest('.popup'));
  })
})

// Слушатель кнопки добавления поста
addButton.addEventListener('click', () => {
  openPopup(popupAddPost)
})

// Слушатель сабмита создания поста
popupAddPost.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(inputPostTitle);
  console.log(inputPostPhoto);


  title = inputPostTitle.value;
  link = inputPostPhoto.value;
  renderPost(title, link);

  inputPostTitle.value = '';
  inputPostPhoto.value = '';
  closePopup(popupAddPost);

  
})

// Слушатель кнопки редактирования профиля
editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputSubtext.value = profileSubtext.textContent;
  openPopup(popupEditProfile);
})

// Слушатель сабмита редактирования профиля
popupEditProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  pageName.textContent = inputName.value + ' | Mesto Russia';
  profileName.textContent = inputName.value;
  profileSubtext.textContent = inputSubtext.value;
  closePopup(popupEditProfile);
})