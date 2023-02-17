import Listbox from "../models/Listbox.js";
import { searchTags, ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";

export default class Search {
  constructor(recipes) {
    this._recipes = recipes;
    this._sortedRecipes = [];
    this._searchBar = "";
    this._ingredients = [];
    this._appliances = [];
    this._utensils = [];
  }

  search() {
    this._sortedRecipes = [];
    this._searchBar = document.getElementById("main-bar").value;
    this._ingredients = [];
    this._appliances = [];
    this._utensils = [];

    this._sortedRecipes = this._recipes;

    // if the searchTags array contains at least one tag :
    if (searchTags.length > 0) {
      let temp = this._sortedRecipes;
      searchTags.forEach((tag) => {
        let tempB = [];

        temp.forEach((recipe) => {
          let noCaseTag = new RegExp(tag, "i");
          noCaseTag.test(recipe._name) && tempB.indexOf(recipe) === -1 ? tempB.push(recipe) : false;
        });
        temp = tempB;
      });
      this._sortedRecipes = temp;
    }

    // if the ingredientsTags array contains at least one tag :
    if (ingredientsTags.length > 0) {
      let temp = this._sortedRecipes;
      ingredientsTags.forEach((tag) => {
        let tempB = [];
        temp.forEach((recipe) => {
          recipe._ingredients.forEach((ingredient) => {
            if (ingredient.ingredient.match(tag) && tempB.indexOf(recipe) === -1) {
              tempB.push(recipe);
            }
          });
        });
        temp = tempB;
      });
      this._sortedRecipes = temp;
    }

    // if the appliancesTags array contains at least one tag :
    if (appliancesTags.length > 0) {
      let temp = [];
      appliancesTags.forEach((tag) => {
        this._sortedRecipes.forEach((recipe) => {
          if (recipe._appliance.match(tag) && temp.indexOf(recipe) === -1) {
            temp.push(recipe);
          }
        });
      });
      this._sortedRecipes = temp;
    }

    // if the utensilsTags array contains at least one tag :
    if (utensilsTags.length > 0) {
      let temp = this._sortedRecipes;
      utensilsTags.forEach((tag) => {
        let tempB = [];
        temp.forEach((recipe) => {
          recipe._utensils.forEach((utensil) => {
            if (utensil.match(tag) && tempB.indexOf(recipe) === -1) {
              tempB.push(recipe);
            }
          });
        });
        temp = tempB;
      });
      this._sortedRecipes = temp;
    }

    // retrieves the recipes section and empties it.
    let recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";

    /*
    for all sorted recipes :
    1. pushes the right tags into the right arrays.
    2. generates the recipe card into the DOM.
    */
    this._sortedRecipes.forEach((recipe) => {
      // fills this._ingredients.
      recipe._ingredients.forEach((ingredient) => {
        if (this._ingredients.indexOf(ingredient.ingredient) === -1) {
          this._ingredients.push(ingredient.ingredient);
        }
      });

      // fills this._appliances.
      if (this._appliances.indexOf(recipe._appliance) === -1) {
        this._appliances.push(recipe._appliance);
      }

      // fills this._utensils.
      recipe._utensils.forEach((utensil) => {
        if (this._utensils.indexOf(utensil) === -1) {
          this._utensils.push(utensil);
        }
      });

      //=//| recipes section |\\=\\
      // generates the cards on the recipes section.
      recipe.card();
    });

    //=//| results division |\\=\\
    let results = document.querySelector(".results");
    results.textContent = `${this._sortedRecipes.length} résultat(s)`;

    //=//| filter division |\\=\\
    // retrieves the filter division then empties it.
    let filterDivision = document.querySelector(".filters");
    filterDivision.innerHTML = "";

    // the tables filled in above (this._ingredients,  this._appliances and this._utensils) are used to generate the options...
    let ingredients = new Listbox({ label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: this._ingredients, color: "#3282f7" });
    let ingredientsContainer = ingredients.createListboxNode();
    let appliances = new Listbox({ label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: this._appliances, color: "#68d9a4" });
    let appliancesContainer = appliances.createListboxNode();
    let utensils = new Listbox({ label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: this._utensils, color: "#ed6454" });
    let utensilsContainer = utensils.createListboxNode();

    // ...then the listboxes are added to the DOM.
    filterDivision.appendChild(ingredientsContainer);
    filterDivision.appendChild(appliancesContainer);
    filterDivision.appendChild(utensilsContainer);

    // test unit - start
    // console.clear();
    // console.log("____________________");
    // console.log("----> searchTags :");
    // console.log(searchTags);
    // console.log("----> ingredientsTags :");
    // console.log(ingredientsTags);
    // console.log("----> appliancesTags :");
    // console.log(appliancesTags);
    // console.log("----> utensilsTags :");
    // console.log(utensilsTags);
    // console.log("         ---        ");
    // console.log("----> this._searchBar :");
    // console.log(this._searchBar);
    // console.log("----> this._ingredients :");
    // console.log(this._ingredients);
    // console.log("----> this._appliances :");
    // console.log(this._appliances);
    // console.log("----> this._utensils :");
    // console.log(this._utensils);
    // console.log("         ---        ");
    console.log("----> this._sortedRecipes :");
    console.log(this._sortedRecipes);
    // test unit - end
  }
}
