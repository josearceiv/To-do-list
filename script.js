const form = document.querySelector("form");
const input = document.querySelector("input");
const ol = document.querySelector("ol");

let editing = false;
let editingItem;
let list = [];

if (localStorage.getItem("list") != null) {
  list = JSON.parse(localStorage.getItem("list"));
  for (let i = 0; i < list.length; i++) {
    ol.innerHTML += `
  <li>
    <p>${list[i]}</p>
    <div>
      <i class="fa-solid fa-pen-to-square" onClick="editItem(this)"></i>
      <i class="fa-solid fa-trash" onClick="deleteItem(this)"></i>
    </div>
  </li>`;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!editing) {
    ol.innerHTML += `
  <li>
    <p>${input.value}</p>
    <div>
      <i class="fa-solid fa-pen-to-square" onClick="editItem(this)"></i>
      <i class="fa-solid fa-trash" onClick="deleteItem(this)"></i>
    </div>
  </li>`;
    list.push(input.value);
    localStorage.setItem("list", JSON.stringify(list));
    input.value = "";
  } else {
    editingItem.textContent = input.value;
    input.value = "";
    editing = false;
    list = Array.from(document.querySelectorAll("li p")).map(
      (p) => p.textContent
    );
    localStorage.setItem("list", JSON.stringify(list));
  }
});

const editItem = (item) => {
  editing = true;
  editingItem = item.parentElement.previousElementSibling;
  input.value = editingItem.textContent;
};

const deleteItem = (item) => {
  item.parentElement.parentElement.remove();
  list = Array.from(document.querySelectorAll("li p")).map(
    (p) => p.textContent
  );
  localStorage.setItem("list", JSON.stringify(list));
};
