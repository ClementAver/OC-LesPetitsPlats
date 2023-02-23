import { searchBarValue, ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";

export default class Search {
  constructor(recipes) {
    this._recipes = recipes;
  }

  search() {
    console.clear();

    let sortedRecipes = new Set(this._recipes);

    if (searchBarValue.size > 0) {
      sortedRecipes.forEach((recipe) => {
        // searchBarValue.values().next().value returns the first value of an iterator based on the searchBarValue set.
        let noCaseTag = new RegExp(searchBarValue.values().next().value, "i");
        // matches if regex tests true on either name, ingredients OR description AND isn't already sorted.
        recipe.nameMatches(noCaseTag) || recipe.ingredientsMatches(noCaseTag) || recipe.descriptionMatches(noCaseTag) ? true : sortedRecipes.delete(recipe);
      });
    }

    if (ingredientsTags.size > 0) {
      ingredientsTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._ingredients.some((ingredient) => ingredient.ingredient.includes(tag))) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    if (appliancesTags.size > 0) {
      appliancesTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._appliance.includes(tag)) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    if (utensilsTags.size > 0) {
      utensilsTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._utensils.some((utensil) => utensil.includes(tag))) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    // test unit - start
    console.log("----> sortedRecipes :");
    console.log(sortedRecipes);
    // test unit - end

    return sortedRecipes;
  }
}
