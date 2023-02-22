import { ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";
import { filterDOM } from "../pages/index.js";

export default class Tag {
  constructor(object) {
    this._name = object.name;
    this._color = object.color;
  }

  addToDOM() {
    const tags = document.querySelector(".tags");
    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.style.backgroundColor = this._color;
    div.classList.add("tag");
    div.innerHTML = `<span>${this._name}</span><i class="fa-sharp fa-regular fa-circle-xmark"></i>`;
    tags.append(div);
    filterDOM();

    let interact = () => {
      let task = (arg) => {
        arg.delete(this._name);
      };
      switch (this._color) {
        case "#3282f7":
          task(ingredientsTags);
          break;
        case "#68d9a4":
          task(appliancesTags);
          break;
        case "#ed6454":
          task(utensilsTags);
      }
    };

    div.addEventListener("click", () => {
      tags.removeChild(div);
      interact();
      filterDOM();
    });

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        tags.removeChild(div);
        interact();
        filterDOM();
      }
    });
  }
}
