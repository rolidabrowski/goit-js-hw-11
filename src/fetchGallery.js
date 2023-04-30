const data = {
  key: '35834669-9c51ed6507dbb52146d120c41',
  url: 'https://pixabay.com/api',
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: true,
};

export const fetchGallery = async name => {
  const response = await fetch(`${data.url}/?key=${data.key}&q=${name}`);
  return await response.json();
};
