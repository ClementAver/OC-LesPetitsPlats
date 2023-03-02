export default class Search {
  constructor(recipes) {
    this._recipes = recipes;
  }

  search(searchBarValue, ingredientsTags, appliancesTags, utensilsTags) {
    let sortedRecipes = new Set(this._recipes);

    if (searchBarValue.length > 2) {
      sortedRecipes.forEach((recipe) => {
        // matches if regex tests true on either name, ingredients OR description AND isn't already sorted.
        recipe.nameIncludes(searchBarValue) || recipe.ingredientsIncludes(searchBarValue) || recipe.descriptionIncludes(searchBarValue) ? true : sortedRecipes.delete(recipe);
      });
    }

    if (ingredientsTags.size > 0) {
      ingredientsTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag))) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    if (appliancesTags.size > 0) {
      appliancesTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._appliance.toLowerCase().includes(tag)) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    if (utensilsTags.size > 0) {
      utensilsTags.forEach((tag) => {
        sortedRecipes.forEach((recipe) => {
          if (!recipe._utensils.some((utensil) => utensil.toLowerCase().includes(tag))) {
            sortedRecipes.delete(recipe);
          }
        });
      });
    }

    // test unit - start
    //console.clear();
    console.log("----> sortedRecipes :");
    console.log(sortedRecipes);
    // test unit - end

    return sortedRecipes;
  }
}
