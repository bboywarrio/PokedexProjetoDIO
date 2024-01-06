const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
const pokemon = await response.json();
const statsResponse = await fetch(pokemon.stats[0].stat.url);
const stats = await statsResponse.json();

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input').value;
  // Realize a requisição à API de Pokeathlon Stat com o valor do input
});
