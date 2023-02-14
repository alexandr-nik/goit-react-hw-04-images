import axios from 'axios';
const PixabayKey = '32020206-eb1e8243d0555b8d860dcfe9c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const AxiosPaxabay = async (page, q) => {
  return await axios
    .get(
      `?key=${PixabayKey}&page=${page}&per_page=12&q=${q}&image_type=photo&orientation=horizontal`
    )
    .then(data => data.data);
};
