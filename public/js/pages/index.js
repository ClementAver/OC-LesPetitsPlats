import { recipes } from "../../../data/recipes.js";

import Recipe from "../models/Recipe.js";
import Listbox from "../models/Listbox.js";
import SearchBar from "../models/SearchBar.js";
import Search from "../utils/Search.js";

let searchBarValue = "";
let ingredientsTags = new Set();
let appliancesTags = new Set();
let utensilsTags = new Set();

let ingredientsOptions = new Set();
let appliancesOptions = new Set();
let utensilsOptions = new Set();

// data > données métier.
let instanciatedRecipes = [];
for (let recipe of recipes) {
  instanciatedRecipes.push(new Recipe(recipe));
}

let filterDOM = () => {
  // retrieves the recipes section and empties it.
  let recipesSection = document.querySelector(".recipes");
  recipesSection.innerHTML = "";

  ingredientsOptions.clear();
  appliancesOptions.clear();
  utensilsOptions.clear();

  let input = document.getElementById("main-bar");
  if (input.value.replaceAll(" ", "") !== "" && input.value.length > 2) {
    searchBarValue = input.value.toLowerCase();
  } else {
    searchBarValue = "";
  }

  let sortedRecipes = search.search(searchBarValue, ingredientsTags, appliancesTags, utensilsTags);

  //=//| results division |\\=\\
  let results = document.querySelector(".results");
  results.textContent = `${sortedRecipes.size} résultat(s)`;

  if (sortedRecipes.size === 0) {
    recipesSection.innerHTML = `<p>Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc."</p>`;
  } else {
    /*
    for all sorted recipes :
    1. fills the listboxes's options sets.
    2. generates the recipe card into the DOM.
  */
    for (let recipe of sortedRecipes) {
      for (let ingredient of recipe._ingredients) {
        ingredientsOptions.add(ingredient.ingredient.toLowerCase());
      }

      appliancesOptions.add(recipe._appliance.toLowerCase());

      for (let utensil of recipe._utensils) {
        utensilsOptions.add(utensil.toLowerCase());
      }

      //=//| recipes section |\\=\\
      // generates the cards on the recipes section.
      recipe.card();
    }

    //=//| filter division |\\=\\
    // retrieves the filter division then empties it.
    let filterDivision = document.querySelector(".filters");
    filterDivision.innerHTML = "";

    // the sets filled in above (ingredientsOptions,  appliancesOptions and utensilsOptions) are used to generate the options...
    let ingredients = new Listbox({ callback: filterDOM, tagsSet: ingredientsTags, label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: ingredientsOptions, color: "#3282f7" });
    let ingredientsContainer = ingredients.createListboxNode();
    let appliances = new Listbox({ callback: filterDOM, tagsSet: appliancesTags, label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: appliancesOptions, color: "#68d9a4" });
    let appliancesContainer = appliances.createListboxNode();
    let utensils = new Listbox({ callback: filterDOM, tagsSet: utensilsTags, label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: utensilsOptions, color: "#ed6454" });
    let utensilsContainer = utensils.createListboxNode();

    // ...then the listboxes are added to the DOM.
    filterDivision.appendChild(ingredientsContainer);
    filterDivision.appendChild(appliancesContainer);
    filterDivision.appendChild(utensilsContainer);
  }
};

//=//| search bar form |\\=\\
// instanciates the search bar
export let mainSearchBar = new SearchBar("Rechercher une recette", filterDOM);

// instanciates the search algorithm.
let search = new Search(instanciatedRecipes);

function init() {
  mainSearchBar.create();
  filterDOM();
}

init();
