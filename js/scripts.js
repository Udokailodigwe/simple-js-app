//Pokedex application

// PokemonList variable
let pokemonList = [
   {name: 'Butterfree', height: 6, type: ['Bug', 'Flying']}, 
   {name: 'Onix', height:7, type: ['Rock', 'Ground']}, 
   {name: 'Vileplume', height:2, type: ['Grass', 'Poison']},
   {name: 'Poliwrath', height:3, type: ['Water', 'Fighting']}
];

// Printed the names and hieght of the element by iterating the pokemon list.
for (let i = 0; i < pokemonList.length; i++){

   let pokeName = pokemonList[i].name;
   let pokeHeight = pokemonList[i].height;
   
if (pokeHeight > 5 && pokeHeight < 7){
   document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + '<br>' );
   }else if (pokeHeight > 6){
   document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + ' - Wow, that\'s a big sized Pokemon!' + '<br>'); //Highlighted the biggest pokemon element in the list.
   }else {
   document.write(pokeName + '  ' + '(' + 'height:' + ' ' + pokeHeight + ')' + '<br>' );
   }
}






