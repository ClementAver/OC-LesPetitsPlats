class Recipe {
  static card(recipe) {
    const article = document.createElement("article");
    const img = document.createElement("div");
    const text = document.createElement("div");

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = recipe.name;
    const time = document.createElement("span");
    time.innerHTML = `<i class="fa-sharp fa-regular fa-clock"></i> ${recipe.time} min`;

    const content = document.createElement("div");
    const ingredients = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      if (ingredient.quantity) {
        if (ingredient.unit) {
          const unit = ingredient.unit;
          // comment formater correctement les unités ?
          li.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity}&#8239;${unit}`;
        } else {
          li.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity}`;
        }
      } else {
        li.innerHTML = `${ingredient.ingredient}`;
      }
      ingredients.append(li);
    });
    const steps = document.createElement("div");

    header.append(title);
    header.append(time);
    content.append(ingredients);
    content.append(steps);
    text.append(header);
    text.append(content);
    article.append(img);
    article.append(text);

    let recipesSection = document.querySelector(".recipes");
    recipesSection.append(article);
  }
}
