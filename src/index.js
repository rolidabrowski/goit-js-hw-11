import Notiflix from 'notiflix';
import { fetchGallery } from './fetchGallery.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchEl = event.currentTarget.elements.searchQuery.value;

  if (searchEl === '') {
    gallery.innerHTML = '';
    return;
  }

  try {
    const value = await fetchGallery(searchEl);
    // console.log(value.hits);

    if (value === '') {
      return Notiflix.Notify.info('Enter the search phrase');
    } else {
      createGallery(value.hits);
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

function createGallery(photos) {
  const info = photos
    .map(
      photo =>
        `<div class="photo-card">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${photo.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${photo.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${photo.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${photo.downloads}
          </p>
        </div>`
    )
    .join('');
  gallery.innerHTML = info;
}
