// data > données métier.
let instanciatedRecipes = [];
recipes.forEach((recipe) => instanciatedRecipes.push(new Recipe(recipe)));
// console.log(instanciatedRecipes);

let activeTags = [];

function init() {
  /*
  // test unit - start
  console.log("----> data :");
  console.log(recipes);
  console.log("----> instanciated recipes from data :");
  console.log(instanciatedRecipes);
  // test unit - end
*/
  // instanciates a new Search class...
  let search = new Search(instanciatedRecipes);
  // ...and calls his search fonction.
  search.search();

  // écouteur de ma barre de recherche principale ici,
  // mais les écouteurs des tags dans les tags, où sera appelée la méthode search de l'instance de search.
}

init();
