// GLOBALS
const baseUrl = 'http://localhost:3001';
let movies = [];
let filteredArray = [];

// NODE GETTERS
const form = () => document.getElementById('form');
const term = () => document.getElementById('search');
const mainUl = () => document.getElementById('main');

// Event Listeners
const attachFormSubmit = () => {
  form().addEventListener('submit', search);
}


// Event Handlers
const loadMovies = async () => {
  const response = await fetch(baseUrl + '/movies')
  movies = await response.json();
  filteredArray = [...movies];
}

const search = async (event) => {
  event.preventDefault();

  const response = await fetch(baseUrl + '/movies?q=' + term().value)
  mainUl().innerHTML = ''
  filteredArray = await response.json();

  term().value = ''

  renderMovies()
}

// MISC

const renderMovies = () => {
  filteredArray.forEach(movie => renderMovie(movie))
}

const renderMovie = movie => {
  const li = document.createElement('li');
  li.innerText = movie.title;
  mainUl().appendChild(li)
}


// SETUP

document.addEventListener('DOMContentLoaded', async () => {
  await loadMovies();
  renderMovies();
  attachFormSubmit();
})