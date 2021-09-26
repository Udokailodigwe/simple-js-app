//Pokedex application

// PokemonList variable
let pokemonList = [
   {name: 'Butterfree', height: 6, type: ['Bug', 'Flying']}, 
   {name: 'Onix', height:7, type: ['Rock', 'Ground']}, 
   {name: 'Vileplume', height:2, type: ['Grass', 'Poison']},
   {name: 'Poliwrath', height:3, type: ['Water', 'Fighting']}
];

// Printed the names and hieght of the element by iterating the pokemon list
for (let i = 0; i < pokemonList.length; i++){
document.write(pokemonList[i].name +' ' + 'height:' + pokemonList[i].height +'.');

// Highlighted individual pokemon item
if (pokemonList[i].height > 6 && pokemonList[i].height < 10){
document.write(' - Wow, that\'s big! ');
}else document.write('  ')
}






