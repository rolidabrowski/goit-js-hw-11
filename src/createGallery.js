export function createGalleryList(photos) {
  const photosHtmlElems = photos.map(photo => getPhotoLayout(photo));
  const photosList = document.querySelector('.gallery');
  photosList.innerHTML = '';
  photosHtmlElems.forEach(elem => photosList.append(elem));
}

function getPhotoLayout(photo) {
  const root = document.createElement('div');
  root.classList.add('gallery');

  root.append(getPhotoProp(photo));
  root.append(getPhotoInfo('Likes: ', photo['likes']));
  root.append(getPhotoInfo('Views: ', photo['views']));
  root.append(getPhotoInfo('Comments: ', photo['comments']));
  root.append(getPhotoInfo('Downloads: ', photo['downloads']));

  return root;
}

function getPhotoProp(property) {
  const prop = document.createElement('div');
  prop.classList.add('gallery__card');
  prop.innerHTML = `<img src="${property['webformatURL']}" alt="${property['tags']}" loading="lazy" />`;
  return prop;
}

function getPhotoInfo(title, property) {
  const prop = document.createElement('div');
  prop.classList.add('gallery__item');
  prop.innerText = `${title}${property}`;
  return prop;
}
