const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;

//CHAMANDO A API
//site da api : https://pokeapi.co/

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json()

        return data;
    }

    
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);


    if(data){
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        input.value = "";

        //vai mudar a variavel para o numero que pesquisou :)
        searchPokemon = data.id
    }else{
        pokemonName.innerHTML = 'NOT FOUND'
        pokemonNumber.innerHTML = ':(';
        pokemonImage.style.display = 'none';
        input.value = "";
    }

    
}

form.addEventListener('submit', (event)=>{

    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());

})




buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});




renderPokemon(searchPokemon);
