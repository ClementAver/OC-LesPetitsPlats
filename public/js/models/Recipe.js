class Recipe {
  static card(recipe) {
    const article = document.createElement("article");
    article.classList.add("card");
    const img = document.createElement("div");
    const text = document.createElement("div");
    text.classList.add("card-text");

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
          li.innerHTML = `<span>${ingredient.ingredient}</span>&#8239;: ${ingredient.quantity} ${unit}`;
        } else {
          li.innerHTML = `<span>${ingredient.ingredient}</span>&#8239;: ${ingredient.quantity}`;
        }
      } else {
        li.innerHTML = `<span>${ingredient.ingredient}</span>`;
      }
      ingredients.append(li);
    });
    const steps = document.createElement("div");
    steps.textContent = recipe.description;

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
