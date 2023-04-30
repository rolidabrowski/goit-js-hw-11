import Notiflix from 'notiflix';
import { fetchGallery } from './fetchGallery.js';
import { createGalleryList } from './createGallery.js';

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
    console.log(value.hits);

    if (value === '') {
      return Notiflix.Notify.info('Enter the search phrase');
    } else {
      createGalleryList(value.hits);
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});
