import { searchTags, ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";
import { mainSearchBar } from "../pages/index.js";

export default class Tag {
  constructor(object) {
    this._name = object.name;
    this._color = object.color;
  }

  add() {
    const tags = document.querySelector(".tags");
    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.style.backgroundColor = this._color;
    div.classList.add("tag");
    div.innerHTML = `<span>${this._name}</span><i class="fa-sharp fa-regular fa-circle-xmark"></i>`;
    tags.append(div);
    mainSearchBar._search.search();

    let interact = () => {
      let tag = "";
      let task = (arg) => {
        tag = arg.indexOf(this._name);
        arg.splice(tag, 1);
      };
      switch (this._color) {
        case "#7e7e7e":
          task(searchTags);
          break;
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
      mainSearchBar._search.search();
    });

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        tags.removeChild(div);
        interact();
        mainSearchBar._search.search();
      }
    });
  }
}
