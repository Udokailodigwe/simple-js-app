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
      if(typeof pokemon === 'object' && 'name' in pokemon) //Checking if items match required before adding to pokemonList array
      { pokemonList.push(pokemon); //Adds pokemon to the pokemonList array
      }else {
         console.log('please search for the right pokemon')
      }
   }
   //Lists all items in pokemonList array
   function getAll (){
      return pokemonList;
   }
   //Returned all defined function keys
   return {
      add : add,
      getAll : getAll
      
   };
})(); 

//Loops through pokemoList array
pokemonRepository.getAll().forEach(function(pokemon){
   document.write(pokemon.name + '  ' + '(' + 'height:' + ' ' + pokemon.height + ')' + ' ' + pokemon.type + '<br>'); //Displays all pokemonList items in the browser
});


