import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const container = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

container.style.visibility = 'hidden';

function updateCatInfo(cat) {
  const url = cat[0].url;
  const name = cat[0].breeds[0].name;
  const description = cat[0].breeds[0].description;
  const temperament = cat[0].breeds[0].temperament;

  load.style.display = 'none';

  catInfo.innerHTML = `
    <div><img src="${url}" alt="${name}" width="400"></div>
    <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <div class='temperament'>
        <h4>Temperament:</h4>
        <p>${temperament}</p>
      </div>
    </div>
  `;
}

container.addEventListener('change', handleChange);
function handleChange() {
  const selectedBreed = this.value;

  load.style.display = 'block';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreed)
    .then(cat => {
      if (cat.length === 0) {
        catInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.error('Sorry, there are no images for the selected breed.')
      } else {
        updateCatInfo(cat);
      }
    })
    .catch(error => {
      error.style.display = 'block';
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      load.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  load.style.display = 'block';
  error.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      container.style.visibility = 'visible';
      load.style.display = 'none';
    
      const cat = breeds.map(breed =>
        `<option value="${breed.id}">${breed.name}</option>`).join('');
    
      container.insertAdjacentHTML('beforeend', cat);
      
      if (container.options.length > 0) {
        container.value = container.options[0].value;
        handleChange.call(container);
      }
    })
    .catch(error => {
      load.style.display = 'none';
      error.style.display = 'block';
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
});