import { MainsearchBarSubmitEvent } from "../pages/index.js";

export default class SearchBar {
  constructor(placeholder) {
    this._placeholder = placeholder;
  }

  create() {
    const header = document.querySelector("header");

    const form = document.createElement("form");
    form.classList.add("search-bar");
    form.setAttribute("role", "search");
    const input = document.createElement("input");
    input.setAttribute("id", "main-bar");
    input.setAttribute("type", "search");
    input.setAttribute("placeholder", this._placeholder);
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("tabindex", "0");
    button.innerHTML = `<svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg"><path d="M23.4167 20.6667H21.9683L21.455 20.1717C23.2517 18.0817 24.3333 15.3683 24.3333 12.4167C24.3333 5.835 18.9983 0.5 12.4167 0.5C5.835 0.5 0.5 5.835 0.5 12.4167C0.5 18.9983 5.835 24.3333 12.4167 24.3333C15.3683 24.3333 18.0817 23.2517 20.1717 21.455L20.6667 21.9683V23.4167L29.8333 32.565L32.565 29.8333L23.4167 20.6667ZM12.4167 20.6667C7.85167 20.6667 4.16667 16.9817 4.16667 12.4167C4.16667 7.85167 7.85167 4.16667 12.4167 4.16667C16.9817 4.16667 20.6667 7.85167 20.6667 12.4167C20.6667 16.9817 16.9817 20.6667 12.4167 20.6667Z" fill="black" /></svg>`;

    form.append(input);
    form.append(button);
    header.after(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      MainsearchBarSubmitEvent();
    });
  }
}
