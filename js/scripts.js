//Pokedex application

// PokemonList variable
let pokemonRepository = (function(){

   // Added to pokemonList array 
   let pokemonList =  [ 
      {name: 'Butterfree', height: 6, type: ['Bug', 'Flying']},
      {name: 'Onix', height:7, type: ['Rock', 'Ground']}, 
      {name: 'Vileplume', height:2, type: ['Grass', 'Poison']},
      {name: 'Poliwrath', height:3, type: ['Water', 'Fighting']} 
   ];

   // Allows for the increment of items in pokemonList array
   function add(pokemon){
      if(typeof pokemon === 'object' && 
      'name' in pokemon && 
      'height' in pokemon && 
      'type' in pokemon) //Checking if items match required before adding to pokemonList array
      { pokemonList.push(pokemon); //Adds pokemon to the pokemonList array
      }else {
         console.log('please search for the right pokemon')
      }
   }

   //Lists all items in pokemonList array
   function getAll (){
      return pokemonList;
   }

   //This function selected, created and  manipulated nodes and also rendered to browser
   function addListItem(pokemon){
      let pokemonList = document.querySelector('.pokemon__list'); //Selected <ul> tag from indexhtml through its class""
      let pokemonListItems = document.createElement('li'); //Created <li> tag for listing pokemon items
      let pokemonButton = document.createElement('button'); //Created <button> for pokemon items
      pokemonButton.innerText = pokemon.name ; //Inserts pokemon 'textname' to the element in browser
      pokemonButton.classList.add('pokemon__list--button'); //Assigned class"" to the <button>
      pokemonListItems.appendChild(pokemonButton); //Made the <button> the child of the created <li> tag
      pokemonList.appendChild(pokemonListItems); //Made the <li> tag the child of the indexhtml<ul> tag
      pokemonButton.addEventListener('click', function (){
         showDetails(pokemon)
      }); //This event function listens to click and logs the details of the pokemon to the console once button is clicked
   }

   //This function logs the details of the pokemon to the console
   function showDetails(pokemon){
      console.log(pokemon);
   };

   //Returned all defined function keys
   return {
      add : add,
      getAll : getAll,
      addListItem: addListItem
   };
})(); 

//Loops through pokemoList array via returned getAll() and addListItem() function
pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});
