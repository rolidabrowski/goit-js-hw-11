import Notiflix from 'notiflix';
import { fetchGallery } from './fetchGallery.js';
import { createGalleryList } from './createGallery.js';

const form = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchEl = event.currentTarget.elements.searchQuery.value;

  if (searchEl === '') {
    return Notiflix.Notify.info('Enter the search phrase');
  }

  try {
    const value = await fetchGallery(searchEl);

    if (value.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createGalleryList(value.hits);
      Notiflix.Notify.success(`Hooray! We found ${value.totalHits} images.`);
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure('Not found images for your request!');
  }
});
