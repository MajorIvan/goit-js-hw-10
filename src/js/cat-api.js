import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_Gd8uLNRVRbIZ6V9JsjWgR1vhaHMQeT7rWNc7XpRGPSEKJoPXrhqBGtbEkwa1bpXy';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
};

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
};