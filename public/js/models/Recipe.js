export default class Recipe {
  constructor(object) {
    this._name = object.name;
    this._ingredients = object.ingredients;
    this._time = object.time;
    this._description = object.description;
    this._appliance = object.appliance;
    this._utensils = object.utensils;
  }

  card() {
    const article = document.createElement("article");
    article.setAttribute("tabindex", "0");
    article.classList.add("card");
    const img = document.createElement("div");
    const text = document.createElement("div");
    text.classList.add("card-text");

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = this._name;
    const time = document.createElement("span");
    time.innerHTML = `<i class="fa-sharp fa-regular fa-clock"></i> ${this._time} min`;

    const content = document.createElement("div");
    const ingredients = document.createElement("ul");
    this._ingredients.forEach((ingredient) => {
      ingredient.ingredient = ingredient.ingredient.toLowerCase();
      const li = document.createElement("li");
      if (ingredient.quantity) {
        if (ingredient.unit) {
          const unit = ingredient.unit;
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
    steps.textContent = this._description;

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

  nameIncludes(string) {
    return this._name.toLowerCase().includes(string.toLowerCase());
  }

  ingredientsIncludes(string) {
    return this._ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(string.toLowerCase()));
  }

  descriptionIncludes(string) {
    return this._description.toLowerCase().includes(string.toLowerCase());
  }
}
