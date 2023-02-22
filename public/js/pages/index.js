import { recipes } from "../../../data/recipes.js";

import Recipe from "../models/Recipe.js";
import Listbox from "../models/Listbox.js";
import SearchBar from "../models/SearchBar.js";
import Search from "../utils/Search.js";

let searchBarValue = new Set();
let ingredientsTags = new Set();
let appliancesTags = new Set();
let utensilsTags = new Set();

let ingredientsOptions = new Set();
let appliancesOptions = new Set();
let utensilsOptions = new Set();

export { searchBarValue, ingredientsTags, appliancesTags, utensilsTags };

// data > données métier.
let instanciatedRecipes = [];
recipes.forEach((recipe) => instanciatedRecipes.push(new Recipe(recipe)));

//=//| search bar form |\\=\\
// instanciates the search bar
export let mainSearchBar = new SearchBar("Rechercher une recette");

// callback of the search bar's submit event.
export function MainsearchBarSubmitEvent() {
  let input = document.getElementById("main-bar");
  searchBarValue.clear();
  if (input.value.replaceAll(" ", "") !== "") {
    searchBarValue.add(input.value);
  }
  filterDOM();
}

// instanciates the search algorithm.
export let search = new Search(instanciatedRecipes);

export function filterDOM() {
  // retrieves the recipes section and empties it.
  let recipesSection = document.querySelector(".recipes");
  recipesSection.innerHTML = "";

  ingredientsOptions.clear();
  appliancesOptions.clear();
  utensilsOptions.clear();

  let sortedRecipes = search.search();

  /*
    for all sorted recipes :
    1. fills the listboxes's options sets.
    2. generates the recipe card into the DOM.
  */
  sortedRecipes.forEach((recipe) => {
    recipe._ingredients.forEach((ingredient) => {
      ingredientsOptions.add(ingredient.ingredient);
    });
    appliancesOptions.add(recipe._appliance);
    recipe._utensils.forEach((utensil) => {
      utensilsOptions.add(utensil);
    });

    //=//| recipes section |\\=\\
    // generates the cards on the recipes section.
    recipe.card();
  });

  //=//| results division |\\=\\
  let results = document.querySelector(".results");
  results.textContent = `${sortedRecipes.size} résultat(s)`;

  //=//| filter division |\\=\\
  // retrieves the filter division then empties it.
  let filterDivision = document.querySelector(".filters");
  filterDivision.innerHTML = "";

  // the sets filled in above (ingredientsOptions,  appliancesOptions and utensilsOptions) are used to generate the options...
  let ingredients = new Listbox({ label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: ingredientsOptions, color: "#3282f7" });
  let ingredientsContainer = ingredients.createListboxNode();
  let appliances = new Listbox({ label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: appliancesOptions, color: "#68d9a4" });
  let appliancesContainer = appliances.createListboxNode();
  let utensils = new Listbox({ label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: utensilsOptions, color: "#ed6454" });
  let utensilsContainer = utensils.createListboxNode();

  // ...then the listboxes are added to the DOM.
  filterDivision.appendChild(ingredientsContainer);
  filterDivision.appendChild(appliancesContainer);
  filterDivision.appendChild(utensilsContainer);
}

function init() {
  mainSearchBar.create();
  filterDOM();
}

init();
