import axios from 'axios';
const apiKey = '39381155-05fe4f33c27a39bf4e8d5348c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchQuery(query, currentPage = '1') {
  const params = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: currentPage,
  };

  const response = await axios.get(BASE_URL, { params });
  const data = response.data;
  return data;
}
