// argument e.g. {label : "Gender", id : "gender", options : ["male", "female", "non binary"]}.
class Listbox {
  constructor(object) {
    this._label = object.label;
    this._placeholder = object.placeholder;
    this._id = object.id;
    this._options = object.options;
    this._state = "retracted";
  }

  createListboxNode() {
    const descriptionContainer = document.createElement("div");
    const description = document.createElement("span");
    description.setAttribute("id", `${this._id}-description`);
    description.setAttribute("tabindex", "0");
    description.classList.add("label");
    description.textContent = `${this._label}`;

    let search = document.createElement("input");
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
    listbox.classList.add("listbox");

    const listboxChevron = document.createElement("i");
    listboxChevron.classList.add("fa-sharp", "fa-solid", "fa-chevron-down");

    this._options.forEach((key) => {
      let formatted = key.replace(/ /g, "").toLowerCase();
      const option = document.createElement("li");
      option.setAttribute("role", "option");
      option.setAttribute("id", `${formatted}`);
      option.setAttribute("tabindex", "0");
      option.textContent = `${key}`;
      option.classList.add("option");
      listbox.append(option);

      option.addEventListener("click", () => {
        retracts();
        console.log(option.textContent);
      });

      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          retracts();
          console.log(option.textContent);
        }
      });
    });

    descriptionContainer.append(description);
    descriptionContainer.append(search);
    descriptionContainer.append(listboxChevron);

    let deploys = () => {
      description.classList.add("sr-only");
      description.setAttribute("tabindex", "-1");
      search.classList.remove("sr-only");
      search.setAttribute("tabindex", "0");
      search.value = "";
      const options = document.querySelectorAll(`#${this._id} [role="option"]`);
      listbox.setAttribute("aria-expanded", "true");
      options.forEach((key) => {
        key.classList.add("displayed");
      });
      this._state = "deployed";
      listboxChevron.classList.add("u-turn");
    };

    let retracts = () => {
      description.classList.remove("sr-only");
      description.setAttribute("tabindex", "0");
      search.classList.add("sr-only");
      search.setAttribute("tabindex", "-1");
      const options = document.querySelectorAll(`#${this._id} [role="option"]`);
      listbox.setAttribute("aria-expanded", "false");
      options.forEach((key) => {
        key.classList.remove("displayed");
      });
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
          if (e.target.closest(`#container-${this._id}`)) {
          } else {
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
            if (e.target.closest(`#container-${this._id}`)) {
            } else {
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
        console.log(search.value);
      } else if (e.key === "Escape") {
        retracts();
      }
    });

    container.append(descriptionContainer);
    container.append(listbox);
    return container;
  }
}
