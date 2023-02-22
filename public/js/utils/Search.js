import { searchBarValue, ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";

export default class Search {
  constructor(recipes) {
    this._recipes = recipes;
  }

  search() {
    console.clear();

    this._sortedRecipes = new Set(this._recipes);

    // if the searchBarValue set contains something :
    if (searchBarValue.size > 0) {
      let temp = this._sortedRecipes;
      let tempB = new Set();

      temp.forEach((recipe) => {
        // searchBarValue.values().next().value returns the first value of an iterator based on the searchBarValue set.
        let noCaseTag = new RegExp(searchBarValue.values().next().value, "i");
        // matches if regex tests true on either name, ingredients OR description AND isn't already sorted.
        recipe.nameMatches(noCaseTag) || recipe.ingredientsMatches(noCaseTag) || recipe.descriptionMatches(noCaseTag) ? tempB.add(recipe) : false;
      });
      temp = tempB;
      this._sortedRecipes = temp;
    }

    /* --new version to be tested--
    if (searchBarValue.size > 0) {
      let temp = new Set();
      this._sortedRecipes.forEach((recipe) => {
        // searchBarValue.values().next().value returns the first value of an iterator based on the searchBarValue set.
        let noCaseTag = new RegExp(searchBarValue.values().next().value, "i");
        // matches if regex tests true on either name, ingredients OR description AND isn't already sorted.
        recipe.nameMatches(noCaseTag) || recipe.ingredientsMatches(noCaseTag) || recipe.descriptionMatches(noCaseTag) ? temp.add(recipe) : false;
      });
      this._sortedRecipes = temp;
    }
    */

    // if the ingredientsTags array contains at least one tag :
    if (ingredientsTags.size > 0) {
      let temp = this._sortedRecipes;
      ingredientsTags.forEach((tag) => {
        let tempB = new Set();
        temp.forEach((recipe) => {
          recipe._ingredients.forEach((ingredient) => {
            ingredient.ingredient.includes(tag) ? tempB.add(recipe) : false;
          });
        });
        temp = tempB;
      });
      this._sortedRecipes = temp;
    }

    /* --new version to be tested--
    if (ingredientsTags.size > 0) {
      let temp = new Set();
      ingredientsTags.forEach((tag) => {
        this._sortedRecipes.forEach((recipe) => {
          recipe._ingredients.forEach((ingredient) => {
            ingredient.ingredient.includes(tag) ? temp.add(recipe) : false;
          });
        });
      });
      this._sortedRecipes = temp;
    }
    */

    // if the appliancesTags array contains at least one tag :
    if (appliancesTags.size > 0) {
      let temp = new Set();
      appliancesTags.forEach((tag) => {
        this._sortedRecipes.forEach((recipe) => {
          recipe._appliance.includes(tag) ? temp.add(recipe) : false;
        });
      });
      this._sortedRecipes = temp;
    }

    // if the utensilsTags array contains at least one tag :
    if (utensilsTags.size > 0) {
      let temp = this._sortedRecipes;
      utensilsTags.forEach((tag) => {
        let tempB = new Set();
        temp.forEach((recipe) => {
          recipe._utensils.forEach((utensil) => {
            utensil.includes(tag) ? tempB.add(recipe) : false;
          });
        });
        temp = tempB;
      });
      this._sortedRecipes = temp;
    }

    /* --new version to be tested--
    if (utensilsTags.size > 0) {
      let temp = new Set();
      utensilsTags.forEach((tag) => {
        this.sortedRecipes.forEach((recipe) => {
          recipe._utensils.forEach((utensil) => {
            utensil.includes(tag) ? temp.add(recipe) : false;
          });
        });
      });
      this._sortedRecipes = temp;
    }
    */

    // test unit - start
    console.log("----> this._sortedRecipes :");
    console.log(this._sortedRecipes);
    // test unit - end

    return this._sortedRecipes;
  }
}
