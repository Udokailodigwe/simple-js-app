//Pokedex application

/**
 *@function: add -  Allows for the increment of items in pokemonList array.
 *                   getAll - Get all pokemon from pokemonList array.
 *                   addListItem - This function selected,and dynamically created nodes rendered
 *                                            to browser.                                 
 *                    showDetails - Loads the details of the pokemon from the API to the console
 *                                            and displays modal
 *                   loadList - Loads the pokemon list from the URL using promise function & fetch().
 *                   loadDetails - will GET the Pokemon details using the promise function & fetch() 
 *                                         through object array in the API.
 *                   showLoadingMessage - Shows Loading message while data is fetched                  
 *                   hideLoadingMessage - Hides loading message after data is fetched.
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
const pokemonRepository = (function () {

   // Added pokemonList array 
   const pokemonList = [];
   const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250';

   //Hunt pokemon by filter
   const huntSection = document.getElementById('hunt__filter');
   huntSection.addEventListener('input', () => {
      let pokemonHunt = document.querySelectorAll('.group-list-item'); //All list button selected.
      let value = huntSection.value.toUpperCase(); //Converts input to uppercase and returns the value.
      pokemonHunt.forEach(function (pokemon) {
         if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
            pokemon.style.display = "";
         } else {
            pokemon.style.display = "none";
         }
      });
   });

   function add(pokemon) {
      if (typeof pokemon === 'object' &&
         'name' &&
         'detailsUrl' in pokemon
      ) //validation expected
      {
         pokemonList.push(pokemon);
      } else {
         console.log('please hunt for the right pokemon')
      }
   }

   function getAll() {
      return pokemonList;
   }

   function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon__list');
      let pokemonListItems = document.createElement('li');
      pokemonListItems.classList.add('group-list-item', 'col-12', 'col-md-4', 'col-lg-3', 'my-2'); //Added bootstrap components to created list tag.

      let pokemonButton = document.createElement('button');
      pokemonButton.innerText = pokemon.name;
      pokemonButton.classList.add('btn', 'btn-info', 'btn-block', 'btn-md', 'text-uppercase', 'font-weight-normal'); //Added button utility classes to created button

      //Link the created button to modal by assigning modal attribute to the button 
      pokemonButton.setAttribute('data-toggle', 'modal');
      pokemonButton.setAttribute('data-target', '#pokemonModalContainer');

      pokemonListItems.appendChild(pokemonButton);
      pokemonList.appendChild(pokemonListItems);

      pokemonButton.addEventListener('click', function () {
         showDetails(pokemon) //Displays the pokemon details on clicks.
      });
   }

   function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
         showModal(pokemon);
      });
   }

   // function showLoadingMessage() {
   //    let loadingMessage = document.querySelector('.loading__message');
   //    window.addEventListener('load', () => {
   //       loadingMessage.style.visibility = 'visible';
   //    })
   // }

   // function hideLoadMessage() {
   //    let loadingMessage = document.querySelector('.loading__message');
   //    setTimeout(() => {
   //       loadingMessage.style.visibility = 'hidden';
   //    }, 500);
   // }

   function loadList() {
      // showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
         return response.json(); //Returns and parse the data through json
      }).then(function (json) {
         // hideLoadMessage();
         json.results.forEach(function (item) { //Loops the parsed data and returns name and details when resovled.
            let pokemon = {
               name: item.name,
               detailsUrl: item.url
            };
            add(pokemon);
         });
      }).catch(function (e) {
         // hideLoadMessage();
         console.error(e);
      })
   }

   function loadDetails(item) {
      // showLoadingMessage(); //Loads message before detials are fetched
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
         // hideLoadMessage(); //Loads message after detials are fetched
         return response.json();
      }).then(function (details) {
         //now we can include the details to the item
         item.imageUrlFront = details.sprites.front_default;
         item.imageUrlBack = details.sprites.back_default;
         item.height = details.height;
         item.weight = details.weight;
         item.types = details.types;
         item.abilities = details.abilities;
      }).catch(function (e) {
         // hideLoadMessage();
         console.error(e);
      });
   }

   function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      //Empty components' content at every point of reload.
      modalBody.empty();
      modalTitle.empty();

      //Create elements for modal components
      let pokemonName = $('<h1>' + pokemon.name + '</h1>');

      let pokemonImageFront = $('<img class = "modal-img" style = "width:50%">');
      pokemonImageFront.attr('src', pokemon.imageUrlFront);
      let pokemonImageBack = $('<img class = "modal-img" style = "width:20%">');
      pokemonImageBack.attr('src', pokemon.imageUrlBack);

      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

      // Loop for pokemon types and abilities ObjectKeyValues through loadDetails function and created their element 
      let pTypes = [];
      Object.keys(pokemon.types).forEach(key => {
         pTypes.push(pokemon.types[key].type.name);
      });
      let pokemonTypes = $('<p>' + 'Type: ' + pTypes + '</p>');

      let pAbilities = [];
      Object.keys(pokemon.abilities).forEach(key => {
         pAbilities.push(pokemon.abilities[key].ability.name);
      })
      let pokemonAbilities = $('<p>' + 'Ability: ' + pAbilities + '</p>');

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImageFront);
      modalBody.append(pokemonImageBack);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
      modalBody.append(pokemonTypes);
      modalBody.append(pokemonAbilities);
   }

   return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal
   };
})();

//Loops through pokemoList array after loading via returned getAll() and addListItem() function
pokemonRepository.loadList().then(function () {  // data loads first.
   pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
   });
});