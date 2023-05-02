export function createGalleryList(photos) {
  const photosHtmlElems = photos.map(photo => getPhotoLayout(photo));
  const photosList = document.querySelector('.gallery');
  photosList.innerHTML = '';
  photosHtmlElems.forEach(elem => photosList.append(elem));
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
