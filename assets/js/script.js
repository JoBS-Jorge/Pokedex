
const pokemonsList = document.getElementById("pokemonsList")
const loadButton = document.getElementById("loadMoreButton")
const cardContent = document.getElementById("cardContent")
const maxRecords = 250
const limit = 10
let offset = 0

const qtdPokemons = document.getElementById("pokeTotal")
qtdPokemons.innerHTML += `${maxRecords} Pokemons na listagem`
//console.log(qtdPokemons)

function loadMorePokemons(offset, limit){
   pokeapi.getPokemons(offset, limit).then((pokeList = []) => {    
      const newHtml = pokeList.map((pokemon) => `
      <li class="pokemon ${pokemon.type}" onclick="showDetails('${pokemon.name}')">
         <span class="poke-number">${pokemon.number}</span>
         <span class="poke-name">${pokemon.name}</span>

         <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>


               <img src="${pokemon.photo}" alt="${pokemon.name}">
         </div>
      </li>
      `).join('')
   	pokemonsList.innerHTML += newHtml
	 })
}


function showDetails(poke) {
	document.querySelector(".pokeEspec").style.display = "flex";
   document.querySelector(".content").style.filter = "blur(10px)";
	const url = `https://pokeapi.co/api/v2/pokemon/${poke}`
	
	fetch(url)
        .then((response) => response.json())
		  .then((detailList = []) => {
			const statsList = []

			const pokeCardDetails = `
			<div class="card-header">
				<button onclick="closeDetails()"><i class="bx bx-x-circle"></i> < </button>
				<span class="poke-number">${detailList.id}</span>
				<span class="poke-name">${detailList.name}</span>
			</div>

			<img src="${detailList.sprites.other.dream_world.front_default}" alt="${detailList.name}">
		  	<div class="detailsList">
				 <ul id="statsList">

				 </ul>				 
		 	 </div>`
		cardContent.innerHTML += pokeCardDetails
		const list = document.getElementById("statsList")
		for(i = 0 ; i <= 5 ; i++){
			let newStat = `<li>${detailList.stats[i].stat.name} ${detailList.stats[i].base_stat}</li>`
			list.innerHTML += newStat
			
		}
		

		})
}
  
function closeDetails() {
	document.querySelector(".pokeEspec").style.display = "none";
 	document.querySelector(".content").style.filter = "blur(0px)";
	cardContent.innerHTML = ''
}


loadMorePokemons(offset, limit)

loadButton.addEventListener("click", () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - limit
        loadMorePokemons(offset, newLimit)

        loadButton.parentElement.removeChild(loadButton)
    } else {
        loadMorePokemons(offset, limit)
    }   
})
