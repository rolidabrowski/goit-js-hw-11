const API_URL = 'https://pixabay.com/api';

const searchParams = new URLSearchParams({
  key: '35834669-9c51ed6507dbb52146d120c41',
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: true,
});

export const fetchGallery = async name => {
  const response = await fetch(`${API_URL}/?q=${name}&${searchParams}`);
  console.log(response);
  return await response.json();
};
