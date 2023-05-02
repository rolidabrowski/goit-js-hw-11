import Notiflix from 'notiflix';
import { fetchGallery } from './fetchGallery.js';
import { createGalleryList } from './createGallery.js';

const form = document.getElementById('search-form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchEl = event.currentTarget.elements.searchQuery.value;

  try {
    const value = await fetchGallery(searchEl);

    if (searchEl === '') {
      return Notiflix.Notify.info('Enter the search phrase');
    } else {
      createGalleryList(value.hits);
      Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`);
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});
