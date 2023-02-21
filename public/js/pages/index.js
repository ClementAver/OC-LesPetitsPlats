import { recipes } from "../../../data/recipes.js";

import Recipe from "../models/Recipe.js";
import SearchBar from "../models/SearchBar.js";

// data > données métier.
let instanciatedRecipes = [];
recipes.forEach((recipe) => instanciatedRecipes.push(new Recipe(recipe)));
// console.log(instanciatedRecipes);

export let mainSearchBar = new SearchBar("Rechercher une recette", instanciatedRecipes);

let searchBarValue = new Set();
let ingredientsTags = new Set();
let appliancesTags = new Set();
let utensilsTags = new Set();

export { searchBarValue, ingredientsTags, appliancesTags, utensilsTags };

function init() {
  mainSearchBar.create();
}

init();
