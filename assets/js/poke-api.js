const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name
    
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetails.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability


    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}   

pokeapi.getPokemons = (offset = 0, limit = 10) => {
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(pokeApiUrl)
        .then((resp) => resp.json())
        .then((dadosApi) => dadosApi.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}