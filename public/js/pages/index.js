// data > données métier.
let instanciatedRecipes = [];
recipes.forEach((recipe) => instanciatedRecipes.push(new Recipe(recipe)));
// console.log(instanciatedRecipes);

let mainSearchBar = new SearchBar("Rechercher une recette", instanciatedRecipes);

let searchTags = [];
let ingredientsTags = [];
let appliancesTags = [];
let utensilsTags = [];

function init() {
  mainSearchBar.create();
}

init();
