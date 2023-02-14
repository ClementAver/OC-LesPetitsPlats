class Search {
  constructor(recipes) {
    this._recipes = recipes;
    this._sortedRecipes = [];
    this._searchBar = "";
    // this._searchTag = false;
    this._ingredients = [];
    this._appliances = [];
    this._utensils = [];
  }

  search() {
    console.log("search");
    this._searchBar = document.getElementById("main-bar").value;

    let DOMFrom = (array) => {
      console.log("DOMFrom");
      let recipesSection = document.querySelector(".recipes");
      recipesSection.innerHTML = "";

      this._ingredients = [];
      this._appliances = [];
      this._utensils = [];

      // fills the tags arrays with sorted recipes datas.
      array.forEach((recipe) => {
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

        // appends the recipe card into the DOM.
        recipe.card();
      });
    };

    if (this._searchBar === "") {
      this._sortedRecipes = this._recipes;
      DOMFrom(this._sortedRecipes);
    } else {
      this._sortedRecipes = this._recipes.filter((recipe) => recipe._name.includes(this._searchBar));
      if (searchTags.indexOf(this._searchBar) === -1) {
        searchTags.push(this._searchBar);
        console.log(searchTags);
        let tag = new Tag({ name: `${this._searchBar}`, color: "#7e7e7e" });
        tag.add();
      }
      DOMFrom(this._sortedRecipes);
    }

    /*
    // test unit - start
    console.log("----> sorted recipes from instanciated ones :");
    console.log(this._sortedRecipes);
    console.log("----> sorted ingredients from sorted recipes :");
    console.log(this._ingredients);
    console.log("----> sorted appliances from sorted recipes :");
    console.log(this._appliances);
    console.log("----> sorted utensils from sorted recipes :");
    console.log(this._utensils);
    // test unit - end
    */

    //=//| filter division |\\=\\
    let filterDivision = document.querySelector(".filters");
    filterDivision.innerHTML = "";

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
