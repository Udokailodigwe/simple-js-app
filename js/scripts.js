//Pokedex application

/**
 *@function: add -  Allows for the increment of items in pokemonList array.
 *                   getAll - Lists all items in pokemonList array.
 *                   addListItem - This function selected, created and  manipulated nodes and also
 *                                           rendered to browser.                                 
 *                    showDetails - Loads the details of the pokemon from the API to the console
 *                                            and displays modal
 *                   loadList - Loads the pokemon list from the URL using promise function & fetch().
 *                   loadDetails - will GET the Pokemon details using the promise function & fetch() 
 *                                         through object array in the API.
 *                   showLoadingMessage - Shows Loading message while data is fetched                  
 *                   hideLoadingMessage - Hides loading message after data is fetched.
 *                   hideModal - Removes modal visibility when called.
 *                   showModal - Created and appended nodes required for modal display on browser
 * 
 * 
 *@return:     Returned all defined function keys.
 *@param {string}:                pokemon - Represents all pokemon.
 *                                response - Holds the expected promise from fetch(). 
 *                                json - Is the main object within the fetched API url. 
 *                                results - Is the json key within the fetched API url.
 *                                item - Contains individual items within the result inside API url.
 *                                e - To catch expected error.
 *                                details - Holds all the features of the pokemon in the item 
 *                                              list within the API url.
 */

// PokemonList variable
const pokemonRepository = (function(){

   // Added pokemonList array 
   const pokemonList =  [ ];
   const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=500';

   const pokemonModalContainer = document.querySelector('.pokemon__modal--container'); //Modal container variable made global

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
      let pokemonListItems = document.createElement('div'); 
      let pokemonButton = document.createElement('button'); 
      pokemonButton.innerText = pokemon.name ; 
      pokemonButton.classList.add('pokemon__list--button'); 
      pokemonListItems.appendChild(pokemonButton); 
      pokemonList.appendChild(pokemonListItems); 
      pokemonButton.addEventListener('click', function (){
         showDetails(pokemon) //Displays the pokemon details on clicks.
      });
   }

   function showDetails(pokemon){
      loadDetails(pokemon).then(function(){
               showModal(pokemon);
      });
   }

function showModal(pokemon){
   pokemonModalContainer.innerText = ' ' ;

   let pokemonModalDisplay = document.createElement('div');
   pokemonModalDisplay.classList.add('pokemon__modal--display');

   let closeModalButton = document.createElement('button');
   closeModalButton.classList.add('close__modal--button');
   closeModalButton.innerText = 'Exit';
   closeModalButton.addEventListener('click', hideModal);

   let modalTitle = document.createElement('h1');
   modalTitle.classList.add('modal__title');
   modalTitle.innerText = pokemon.name;

   let pokemonImage = document.createElement('img');
   pokemonImage.classList.add('pokemon__image');
   pokemonImage.src = pokemon.imageUrl;   
   
   let pokemonHeight = document.createElement('p');
   pokemonHeight.classList.add('pokemon__height');
   pokemonHeight.innerText = 'Height: ' + pokemon.height;

   pokemonModalDisplay.appendChild(closeModalButton);
   pokemonModalDisplay.appendChild(modalTitle);
   pokemonModalDisplay.appendChild(pokemonImage);
   pokemonModalDisplay.appendChild(pokemonHeight);
   pokemonModalContainer.appendChild(pokemonModalDisplay);
   
   pokemonModalContainer.classList.add('is-visible');
}

function hideModal () {
   pokemonModalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', function(e){
   if(e.key === 'Escape' && pokemonModalContainer.classList.contains('is-visible')) {
      hideModal();
   } //Close modal with esc key
});

pokemonModalContainer.addEventListener('click', (e) => { //
   let target = e.target; //To click overlay to close, else, clicking on the modal closes modal too.
   if(target === pokemonModalContainer) {
      hideModal();
   }
});

function showLoadingMessage(){
   let loadingMessage = document.querySelector('.loading__message'); 
   window.addEventListener('load', () => {
      loadingMessage.style.visibility = 'visible';
   })
}

function hideLoadMessage(){
   let loadingMessage = document.querySelector('.loading__message');
   setTimeout(() => {
      loadingMessage.style.visibility = 'hidden';
   }, 500);
}

function loadList(){
   showLoadingMessage();
   return fetch(apiUrl).then(function(response){
      return response.json(); //Returns and parse the data through json
   }).then(function(json){
      hideLoadMessage();
      json.results.forEach(function(item){ //Loops the parsed data and returns name and details when resovled.
         let pokemon = {
            name: item.name,
            detailsUrl: item.url
         };
         add(pokemon);
         });
   }).catch(function (e) {
      hideLoadMessage();
      console.error(e);
   })
}

function loadDetails (item) {
   showLoadingMessage(); //Loads message before detials are fetched
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
      hideLoadMessage(); //Loads message after detials are fetched
      return response.json();
   }).then(function (details){
      //now we can include the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
   }).catch(function (e){
      hideLoadMessage();
      console.error(e);
   });
}

return {
      add : add,
      getAll : getAll,
      addListItem: addListItem,
      loadList : loadList,
      loadDetails : loadDetails,
      showDetails : showDetails,
      showModal : showModal
   };
})(); 

//Loops through pokemoList array after loading via returned getAll() and addListItem() function
pokemonRepository.loadList().then(function() {  // data loads first.
pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});
});