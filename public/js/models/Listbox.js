import Tag from "../models/Tag.js";

// argument e.g. { callback: filterDOM, tagsSet: ingredientsTags, label: "Ingrédients", placeholder: "Rechercher un ingrédient", id: "ingredients", options: ingredientsOptions, color: "#3282f7" }.
export default class Listbox {
  constructor(object) {
    this._callback = object.callback;
    this._tagsSet = object.tagsSet;
    this._label = object.label;
    this._placeholder = object.placeholder;
    this._id = object.id;
    this._options = object.options;
    this._color = object.color;

    this._descriptionContainer = document.createElement("div");
    this._description = document.createElement("span");
    this._listbox = document.createElement("ul");
    this._search = document.createElement("input");
    this._container = document.createElement("div");
    this._listboxChevron = document.createElement("i");
    this._state = "retracted";
  }

  createOptions(set) {
    this._listbox.innerHTML = "";
    set.forEach((key) => {
      let formatted = key.replace(/ /g, "").toLowerCase();
      const option = document.createElement("li");
      option.setAttribute("role", "option");
      option.setAttribute("id", `${formatted}`);
      option.setAttribute("tabindex", "0");
      option.textContent = `${key}`;
      option.classList.add("option");
      this._listbox.append(option);

      option.addEventListener("click", () => {
        this.retracts();
        this.optionListenerCallback(key);
      });

      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.retracts();
          this.optionListenerCallback(key);
        }
      });
    });
  }

  deploys() {
    this._container.classList.add("box-shadow");
    this._description.classList.add("sr-only");
    this._description.setAttribute("tabindex", "-1");
    this._search.classList.remove("sr-only");
    this._search.setAttribute("tabindex", "0");
    this._search.value = "";
    this._listbox.setAttribute("aria-expanded", "true");
    this._listbox.classList.remove("not-displayed");
    this._state = "deployed";
    this._listboxChevron.classList.add("u-turn");
    this.createOptions(this._options);
  }

  retracts() {
    this._container.classList.remove("box-shadow");
    this._description.classList.remove("sr-only");
    this._description.setAttribute("tabindex", "0");
    this._search.classList.add("sr-only");
    this._search.setAttribute("tabindex", "-1");
    this._listbox.setAttribute("aria-expanded", "false");
    this._listbox.classList.add("not-displayed");
    this._state = "retracted";
    this._listboxChevron.classList.remove("u-turn");
  }

  // callback of the interaction with an option ("click" or "Enter").
  optionListenerCallback(key) {
    if (!this._tagsSet.has(key)) {
      this._tagsSet.add(key);
      let tag = new Tag({ name: `${key}`, color: `${this._color}`, set: this._tagsSet, callback: this._callback });
      tag.addToDOM();
    }
  }

  createListboxNode() {
    this._description.setAttribute("id", `${this._id}-description`);
    this._description.setAttribute("tabindex", "0");
    this._description.classList.add("label");
    this._description.textContent = `${this._label}`;

    this._search.style.backgroundColor = this._color;
    this._search.setAttribute("id", `${this._id}-search`);
    this._search.setAttribute("type", "text");
    this._search.classList.add("sr-only");
    this._search.setAttribute("tabindex", "-1");
    this._search.setAttribute("placeholder", `${this._placeholder}`);

    this._container.setAttribute("id", `container-${this._id}`);
    this._container.classList.add("listbox-container");
    this._listbox.setAttribute("aria-labelledby", `${this._id}-description`);
    this._listbox.setAttribute("role", "listbox");
    this._listbox.setAttribute("aria-expanded", "false");
    this._listbox.setAttribute("id", `${this._id}`);
    this._listbox.classList.add("listbox", "not-displayed");

    this._listboxChevron.classList.add("fa-sharp", "fa-solid", "fa-chevron-down");

    this.createOptions(this._options);

    this._descriptionContainer.append(this._description);
    this._descriptionContainer.append(this._search);
    this._descriptionContainer.append(this._listboxChevron);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this._search.classList.contains("sr-only")) {
        this.retracts();
      }
    });

    window.addEventListener("click", (e) => {
      switch (this._state) {
        case "retracted":
          if (e.target.closest(`#container-${this._id} > div`)) {
            this.deploys();
          }
          break;
        case "deployed":
          if (!e.target.closest(`#container-${this._id}`)) {
            this.retracts();
          }
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        switch (this._state) {
          case "retracted":
            if (e.target.closest(`#container-${this._id} > div`)) {
              this.deploys();
              this._search.focus();
            }
            break;
          case "deployed":
            if (!e.target.closest(`#container-${this._id}`)) {
              this.retracts();
            }
        }
      }
    });

    this._description.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        switch (this._state) {
          case "retracted":
            this.deploys();
            this._search.focus();
        }
      }
    });

    this._search.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter") {
        this.retracts();
      } else if (e.key === "Escape") {
        this.retracts();
      }
    });

    this._search.addEventListener("keyup", (e) => {
      e.stopPropagation();
      let filteredOptions = new Set();
      this._options.forEach((option) => (option.toLowerCase().includes(this._search.value.toLowerCase()) ? filteredOptions.add(option) : false));
      this.createOptions(filteredOptions);
    });

    this._container.append(this._descriptionContainer);
    this._container.append(this._listbox);
    this._container.style.backgroundColor = this._color;
    return this._container;
  }
}
