import axios from 'axios';
const PixabayKey = '32020206-eb1e8243d0555b8d860dcfe9c';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = PixabayKey;
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
  image_type: 'photo'
};

export const AxiosPaxabay = async (page, q) => {
  return await axios
    .get(
      `?key=${PixabayKey}&page=${page}&per_page=12&q=${q}`
    )
    .then(data => data.data);
};
