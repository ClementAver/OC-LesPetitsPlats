let instanciatedRecipes = [];
let sortedRecipes = [];
let sortedIngredients = [];
let sortedAppliances = [];
recipes.forEach((recipe) => instanciatedRecipes.push(new Recipe(recipe)));
console.log(instanciatedRecipes);

function createsfilterListboxes() {
  //=//| filter division |\\=\\
  let filterDivision = document.querySelector(".filters");

  let ingredients = new Listbox({ label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: ["Lait de coco", "Jus de citron", "Tomate"], color: "#3282f7" });
  let ingredientsContainer = ingredients.createListboxNode();
  let appliances = new Listbox({ label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: ["Lait de coco", "Jus de citron", "Tomate"], color: "#68d9a4" });
  let appliancesContainer = appliances.createListboxNode();
  let utensils = new Listbox({ label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: ["Lait de coco", "Jus de citron", "Tomate"], color: "#ed6454" });
  let utensilsContainer = utensils.createListboxNode();

  filterDivision.appendChild(ingredientsContainer);
  filterDivision.appendChild(appliancesContainer);
  filterDivision.appendChild(utensilsContainer);
}

function init() {
  let search = new Search(instanciatedRecipes);
  search.search();
  console.log(sortedRecipes);
  createsfilterListboxes();

  // écouteur de ma barre de recherche principale ici,
  // mais les écouteurs des tags dans les tags, où sera appelée la méthode search de l'instance de search.
}

init();
