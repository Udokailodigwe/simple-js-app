//Pokedex application

// PokemonList variable
var pokemonRepository = (function(){

   // Added to pokemonList array 
   var pokemonList =  [ 
      {name: 'Butterfree', height: 6, type: ['Bug', 'Flying']},
      {name: 'Onix', height:7, type: ['Rock', 'Ground']}, 
      {name: 'Vileplume', height:2, type: ['Grass', 'Poison']},
      {name: 'Poliwrath', height:3, type: ['Water', 'Fighting']} 
   ];

   // Allows for the increament of items in pokemonList array
   function add(Pokemon){
      if(typeof pokemon === 'object' && 'name' in pokemon) //Checking if items match required before adding to pokemonList array
      { pokemonList.push(Pokemon); //Adds pokemon to the pokemonList array
      }else {
         console.log('please search for the right pokemon')
      }
   }
   //Lists all items in pokemonList array
   function getAll (){
      return pokemonList;
   }

   return {
      add : add,
      getAll : getAll
      
   };
})(); 

//Loops through pokemoList array
pokemonRepository.getAll().forEach(function(pokemon){
   document.write(pokemon + '<br>');
});






// Printed the names and hieght of the element by iterating the pokemon list.

//    let pokeName = pokemonList.name;
//    let pokeHeight = pokemonList.height;
// // for (let i = 0; i < pokemonList.length; i++)
// pokemonList.forEach(function(pokemonList){
   
// });

   
// if (pokeHeight > 5 && pokeHeight < 7){
//    document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + '<br>' );
//    }else if (pokeHeight > 6){
//    document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + ' - Wow, that\'s a big sized Pokemon!' + '<br>'); //Highlighted the biggest pokemon element in the list.
//    }else {
//    document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + '<br>' );
//    }
// }