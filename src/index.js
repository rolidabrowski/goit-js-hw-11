import Notiflix from 'notiflix';
import axios from 'axios';
import MoveTo from 'moveto';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const formInputEl = document.querySelector('#search-form input');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const moveTo = new MoveTo({
  tolerance: 0,
  duration: 10000,
  easing: 'easeOutQuart',
  container: window,
});

let page = 1;
let perPage = 40;

const fetchPhotos = async () => {
  const API_URL = 'https://pixabay.com/api/';
  const response = await axios.get(API_URL, {
    params: {
      key: '35294695-6bfc4b24db5372eaae3354bab',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: formInputEl.value,
      page: page,
      per_page: perPage,
    },
  });
  return response;
};

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;

  if (formInputEl.value === '') {
    return Notiflix.Notify.info('Enter the search phrase');
  }

  try {
    const value = await fetchPhotos();

    if (value.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      loadPhotos(value.data.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${value.data.totalHits} images.`
      );
      loadMoreBtn.classList.remove('hidden');
      moveTo.move(document.querySelector('.load-more'));
    }
  } catch (error) {
    Notiflix.Notify.failure('Not found images for your request!');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  const value = await fetchPhotos();
  const limit = value.data.totalHits - (page - 1) * perPage;

  loadPhotos(value.data.hits);
  moveTo.move(document.querySelector('.load-more'));

  if (value.data.hits.length > limit) {
    Notiflix.Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
    loadMoreBtn.classList.add('hidden');
  }
});

function loadPhotos(photos) {
  const photosHtmlElems = photos.map(photo => getPhotoLayout(photo));
  gallery.insertAdjacentHTML = '';
  photosHtmlElems.forEach(elem => gallery.append(elem));
  lightbox.refresh('.gallery a');
}

function getPhotoLayout(photo) {
  const root = document.createElement('div');
  root.classList.add('gallery__card');
  root.append(getPhotoProp(photo));
  return root;
}

function getPhotoProp(property) {
  const prop = document.createElement('div');
  prop.classList.add('gallery__item');
  prop.insertAdjacentHTML(
    'beforeend',
    `<a class="gallery__link" href="${property['largeImageURL']}">
            <img class="gallery__image" src="${property['webformatURL']}" alt="${property['tags']}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${property['likes']}
            </p>
            <p class="info-item">
              <b>Views</b>${property['views']}
            </p>
            <p class="info-item">
              <b>Comments</b>${property['comments']}
            </p>
            <p class="info-item">
              <b>Downloads</b>${property['downloads']}
            </p>
            </div>`
  );
  return prop;
}
