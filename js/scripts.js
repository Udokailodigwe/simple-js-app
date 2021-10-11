//Pokedex application

/**
 * Below is a program that contains the src code for a Pokédex web app.
 * users can view a list of data and see more details for a given data item on
demand.
*/

/**
 *@function: add -  Allows for the increment of items in pokemonList array.
 *                   getAll - Lists all items in pokemonList array.
 *                   addListItem - This function selected, created and  manipulated nodes and 
 *                                          also rendered to browser.
 *                   showDetails - Loads the details of the pokemon from the API to the console.
 *                   loadList - Loads the list of pokemon from the URL using fetch().
 *                   loadDetails - will GET the Pokemon details using the URL from the Pokémon 
 *                                         object in the parameter.
 * 
 *@return:     Returned all defined function keys.
 *@param {string}:                pokemon - Represents all pokemon.
 *                                response - Holds the expected promise from fetch(). 
 *                                json - Is the main object within the fetched API url. 
 *                                result - Is the json key within the fetched API url.
 *                                item - Contains individual items within the result inside API url.
 *                                e - To catch expected error.
 *                                details - Holds all the features of the pokemon in the item 
 *                                              list within the API url.
 */

// PokemonList variable
let pokemonRepository = (function(){

   // Added pokemonList array 
   let pokemonList =  [ ];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

   function add(pokemon){
      if(typeof pokemon === 'object' && 
      'name' && 
      'detailsUrl' in pokemon 
      ) //validation expected
      { pokemonList.push(pokemon); 
      }else {
         console.log('please search for the right pokemon')
      }
   }

   function getAll (){
      return pokemonList;
   }

   function addListItem(pokemon){
      let pokemonList = document.querySelector('.pokemon__list');  
      let pokemonListItems = document.createElement('li'); 
      let pokemonButton = document.createElement('button'); 
      pokemonButton.innerText = pokemon.name ; 
      pokemonButton.classList.add('pokemon__list--button'); 
      pokemonListItems.appendChild(pokemonButton); 
      pokemonList.appendChild(pokemonListItems); 
      pokemonButton.addEventListener('click', function (){
         showDetails(pokemon)
      });
   }

   function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
               console.log(pokemon);
      });
   };

function loadList() {
return fetch(apiUrl).then(function (response) {
      return response.json();
   }).then(function (json) {
      json.results.forEach(function (item) {
      let pokemon = {
         name: item.name,
         detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
      });
   }).catch(function (e) {
      console.error(e);
   })
}

function loadDetails(item) {
let url = item.detailsUrl;
   return fetch(url).then(function (response) {
      return response.json();
   }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
   }).catch(function (e) {
      console.error(e);
   });
}

return {
      add : add,
      getAll : getAll,
      addListItem: addListItem,
      loadList : loadList,
      loadDetails : loadDetails,
      showDetails : showDetails
   };
})(); 

//Loops through pokemoList array after loading via returned getAll() and addListItem() function
pokemonRepository.loadList().then(function() {  // data loads first.
pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});
});