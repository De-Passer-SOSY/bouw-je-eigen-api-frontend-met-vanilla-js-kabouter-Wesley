"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  createList();

  const searchDuckForm = document.querySelector("#search-duck-form");
  searchDuckForm.addEventListener("submit", searchInDuckList);

  const addDuckForm = document.querySelector("#add-duck-form");
  addDuckForm.addEventListener("submit", AddToDuckList);
}

async function requestAPI() {
  const url = "http://localhost:3333/ducks";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function AddToDuckList(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const naam = formData.get("naam");
  const categorie = formData.get("categorie");
  const kleur = formData.get("kleur");
  const materiaal = formData.get("materiaal");
  const beschrijving = formData.get("beschrijving");
  const response = await fetch("http://localhost:3333/addDuck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      naam: naam,
      categorie: categorie,
      kleur: kleur,
      materiaal: materiaal,
      beschrijving: beschrijving,
    }),
  });

  const data = await response.json();
  alert(data.message);
}

async function searchInDuckList(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const allDucks = await requestAPI();
  const filteredDucks = allDucks.filter((duck) => duck.naam.includes(name));
  const searchedDuck = filteredDucks.length > 0 ? filteredDucks : allDucks;
  const list = document.querySelector("#duck-list");
  list.textContent = "";
  listChild(list, searchedDuck);
}

async function createList() {
  const info = await requestAPI();
  const list = document.querySelector("#duck-list");
  list.textContent = "";
  listChild(list, info);
}

function listChild(parent, content) {
  parent.innerHTML = content
    .map(
      (item) => `
    <li class="p-3 bg-gray-50 m-2">
      <section class="flex" id=#${item.id}> 
        <span class="flex flex-1"> ${item.naam} </span>
        <button class="bg-red-400 h-8 w-8 hover:cursor-pointer font-bold delete-button"> X </button>
      </section>
    </li>
    `
    )
    .join("");

  const deleteButton = document.querySelectorAll(".delete-button");
  console.log(typeof deleteButton);
  deleteButton.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

async function deleteTask(e) {
  const button = e.target;
  const regex = /\d+/;
  const id = (button.parentNode.id.match(regex) || [""])[0];

  const response = await fetch(`http://localhost:3333/removeDuck/${id}`, {
    method: "DELETE",
  })
    .then(async () => {
      console.log("🗑️ Afwezigheid verwijderd.", "success");
      createList();
    })
    .catch(() => console.log("❌ Verwijderen mislukt.", "error"));
}
