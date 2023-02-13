class Tag {
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

    div.addEventListener("click", () => {
      tags.removeChild(div);
    });

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        tags.removeChild(div);
      }
    });
  }
}
