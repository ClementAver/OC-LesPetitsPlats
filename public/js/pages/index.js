function createsfilterListboxes() {
  let filterDivision = document.querySelector(".filter-division");

  let ingredients = new Listbox({ label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: ["Lait de coco", "Jus de citron", "Tomate"] });
  let ingredientsContainer = ingredients.createListboxNode();
  let appliances = new Listbox({ label: "Appareils", placeholder: "Rechercher un appareil", id: "appliances", options: ["Lait de coco", "Jus de citron", "Tomate"] });
  let appliancesContainer = appliances.createListboxNode();
  let utensils = new Listbox({ label: "Ustensiles", placeholder: "Rechercher un ustensile", id: "utensils", options: ["Lait de coco", "Jus de citron", "Tomate"] });
  let utensilsContainer = utensils.createListboxNode();

  filterDivision.appendChild(ingredientsContainer);
  filterDivision.appendChild(appliancesContainer);
  filterDivision.appendChild(utensilsContainer);
}

function init() {
  createsfilterListboxes();
}

init();
