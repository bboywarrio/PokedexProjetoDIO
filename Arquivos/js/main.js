const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonContainer = document.getElementById('pokemonContainer'); // Elemento para exibir a imagem do Pokémon

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input').value;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
  const pokemon = await response.json();

  // Exiba a imagem do Pokémon à direita das informações
  const pokemonDetailContainer = document.createElement('div');
  pokemonDetailContainer.classList.add('pokemon-detail');

  pokemonDetailContainer.innerHTML = `
    <p class="name">Nome: ${pokemon.name}</p>
    <p class="attribute">Atributo: ${pokemon.types[0].type.name}</p>
    <p class="value">Valor: ${pokemon.stats[0].base_stat}</p>
    <div class="image-container">
      <img class="pokemon-image" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    </div>
  `;

  // Substitua o conteúdo anterior pelo novo
  const pokemonContainer = document.querySelector('.content');
  if (pokemonContainer) {
    pokemonContainer.innerHTML = '';
    pokemonContainer.appendChild(pokemonDetailContainer);
  }
});

const limit = 5;
let offset = 0;
const maxRecords = 115

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type} pokemon-detail"> <!-- Adicione a classe pokemon-detail aqui -->
        <span class="number">#${pokemon.number}</span> 
        <span class="name">${pokemon.name}</span> 
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="status ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
        `).join('');

        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNexPage = offset + limit;
    if(qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
