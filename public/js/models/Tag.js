export default class Tag {
  constructor(object) {
    this._name = object.name;
    this._color = object.color;
    this._set = object.set;
    this._callback = object.callback;
  }

  tagDeletion = () => {
    this._set.delete(this._name);
  };

  addToDOM() {
    const tags = document.querySelector(".tags");
    const div = document.createElement("div");
    div.setAttribute("tabindex", "0");
    div.style.backgroundColor = this._color;
    div.classList.add("tag");
    div.innerHTML = `<span>${this._name}</span><i class="fa-sharp fa-regular fa-circle-xmark"></i>`;
    tags.append(div);
    this._callback();

    div.addEventListener("click", () => {
      tags.removeChild(div);
      this.tagDeletion();
      this._callback();
    });

    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        tags.removeChild(div);
        this.tagDeletion();
        this._callback();
      }
    });
  }
}
