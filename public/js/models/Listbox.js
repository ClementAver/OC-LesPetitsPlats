import Tag from "../models/Tag.js";
import { ingredientsTags, appliancesTags, utensilsTags } from "../pages/index.js";

// argument e.g. {label : "Gender", id : "gender", options : ["male", "female", "non binary"], color: #ffffff}.
export default class Listbox {
  constructor(object) {
    this._label = object.label;
    this._placeholder = object.placeholder;
    this._id = object.id;
    this._options = object.options;
    this._state = "retracted";
    this._color = object.color;
  }

  createListboxNode() {
    const descriptionContainer = document.createElement("div");
    const description = document.createElement("span");
    description.setAttribute("id", `${this._id}-description`);
    description.setAttribute("tabindex", "0");
    description.classList.add("label");
    description.textContent = `${this._label}`;

    let search = document.createElement("input");
    search.style.backgroundColor = this._color;
    search.setAttribute("id", `${this._id}-search`);
    search.setAttribute("type", "text");
    search.classList.add("sr-only");
    search.setAttribute("tabindex", "-1");
    search.setAttribute("placeholder", `${this._placeholder}`);

    const container = document.createElement("div");
    container.setAttribute("id", `container-${this._id}`);
    container.classList.add("listbox-container");
    const listbox = document.createElement("ul");
    listbox.setAttribute("aria-labelledby", `${this._id}-description`);
    listbox.setAttribute("role", "listbox");
    listbox.setAttribute("aria-expanded", "false");
    listbox.setAttribute("id", `${this._id}`);
    listbox.classList.add("listbox", "not-displayed");

    const listboxChevron = document.createElement("i");
    listboxChevron.classList.add("fa-sharp", "fa-solid", "fa-chevron-down");

    let createOptions = (array) => {
      listbox.innerHTML = "";
      array.forEach((key) => {
        let formatted = key.replace(/ /g, "").toLowerCase();
        const option = document.createElement("li");
        option.setAttribute("role", "option");
        option.setAttribute("id", `${formatted}`);
        option.setAttribute("tabindex", "0");
        option.textContent = `${key}`;
        option.classList.add("option");
        listbox.append(option);

        let interact = () => {
          let task = (arg) => {
            if (arg.indexOf(key) === -1) {
              arg.push(key);
              let tag = new Tag({ name: `${key}`, color: `${this._color}` });
              tag.add();
            }
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

        option.addEventListener("click", () => {
          retracts();
          interact();
        });

        option.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            retracts();
            interact();
          }
        });
      });
    };
    createOptions(this._options);

    descriptionContainer.append(description);
    descriptionContainer.append(search);
    descriptionContainer.append(listboxChevron);

    let deploys = () => {
      container.classList.add("box-shadow");
      description.classList.add("sr-only");
      description.setAttribute("tabindex", "-1");
      search.classList.remove("sr-only");
      search.setAttribute("tabindex", "0");
      search.value = "";
      listbox.setAttribute("aria-expanded", "true");
      listbox.classList.remove("not-displayed");
      this._state = "deployed";
      listboxChevron.classList.add("u-turn");
      // createOptions(this._options);
    };

    let retracts = () => {
      container.classList.remove("box-shadow");
      description.classList.remove("sr-only");
      description.setAttribute("tabindex", "0");
      search.classList.add("sr-only");
      search.setAttribute("tabindex", "-1");
      listbox.setAttribute("aria-expanded", "false");
      listbox.classList.add("not-displayed");
      this._state = "retracted";
      listboxChevron.classList.remove("u-turn");
    };

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !search.classList.contains("sr-only")) {
        retracts();
      }
    });

    window.addEventListener("click", (e) => {
      switch (this._state) {
        case "retracted":
          if (e.target.closest(`#container-${this._id} > div`)) {
            deploys();
          }
          break;
        case "deployed":
          if (!e.target.closest(`#container-${this._id}`)) {
            retracts();
          }
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        switch (this._state) {
          case "retracted":
            if (e.target.closest(`#container-${this._id} > div`)) {
              deploys();
              search.focus();
            }
            break;
          case "deployed":
            if (!e.target.closest(`#container-${this._id}`)) {
              retracts();
            }
        }
      }
    });

    description.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        switch (this._state) {
          case "retracted":
            deploys();
            search.focus();
        }
      }
    });

    search.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        retracts();
      } else if (e.key === "Escape") {
        retracts();
      }
    });

    search.addEventListener("keyup", (e) => {
      e.stopPropagation();
      let filteredOptions = this._options.filter((option) => option.toLowerCase().includes(search.value.toLowerCase()));
      createOptions(filteredOptions);
    });

    container.append(descriptionContainer);
    container.append(listbox);
    container.style.backgroundColor = this._color;
    return container;
  }
}
