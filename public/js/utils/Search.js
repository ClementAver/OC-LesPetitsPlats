class Search {
  constructor(recipes) {
    this._recipes = recipes;
    this._sortedRecipes = [];
    this._searchBar = "";
    this._ingredients = [];
    this._appliances = [];
    this._utensils = [];
  }

  search() {
    // fills the tags arrays with sorted recipes datas (1st line "this._recipes" to be replaced with "this._sortedRecipes").
    this._recipes.forEach((recipe) => {
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
    });

    // test unit - start
    console.log("----> sorted recipes from instanciated ones :");
    console.log(this._recipes);
    console.log("----> sorted ingredients from sorted recipes :");
    console.log(this._ingredients);
    console.log("----> sorted appliances from sorted recipes :");
    console.log(this._appliances);
    console.log("----> sorted utensils from sorted recipes :");
    console.log(this._utensils);
    // test unit - end

    //=//| filter division |\\=\\
    let filterDivision = document.querySelector(".filters");

    let ingredients = new Listbox({ label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: this._ingredients, color: "#3282f7" });
    let ingredientsContainer = ingredients.createListboxNode();
    let appliances = new Listbox({ label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: this._appliances, color: "#68d9a4" });
    let appliancesContainer = appliances.createListboxNode();
    let utensils = new Listbox({ label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: this._utensils, color: "#ed6454" });
    let utensilsContainer = utensils.createListboxNode();

    filterDivision.appendChild(ingredientsContainer);
    filterDivision.appendChild(appliancesContainer);
    filterDivision.appendChild(utensilsContainer);
  }
}
