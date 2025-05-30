"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  createList();

  const searchDuckForm = document.querySelector("#search-duck-form");
  searchDuckForm.addEventListener("submit", searchInDuckList);

  const DuckForm = document.querySelector("#duck-form");
  DuckForm.addEventListener("submit", handleFormSubmit);
}

async function openDuckPage(e) {
  const button = e.target;
  const regex = /\d+/;
  const id = (button.parentNode.id.match(regex) || [""])[0];
  pageType = "duck-page";
}

async function searchDuck(searchMethode, searchKey) {
  const allDucks = await requestAPI();
  const key = String(searchKey).toLowerCase();

  const exactMatches = allDucks.filter((duck) => {
    const value = String(duck[searchMethode]).toLowerCase();
    return value === key;
  });
  if (exactMatches.length > 0) {
    return exactMatches[0];
  }

  const filteredDucks = allDucks.filter((duck) => {
    const value = String(duck[searchMethode]).toLowerCase();
    return value.includes(key);
  });

  return filteredDucks.length > 0 ? filteredDucks : allDucks;
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

async function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get("duck-id") ? formData.get("duck-id") : null;

  const naam = formData.get("naam");
  const categorie = formData.get("categorie");
  const kleur = formData.get("kleur");
  const materiaal = formData.get("materiaal");
  const beschrijving = formData.get("beschrijving");

  const submitName = e.target;
  const method = submitName === "submit" ? "POST" : "PUT";
  const subdomain = submitName === "submit" ? "addDuck" : "updateDuck";
  const response = await fetch(`http://localhost:3333/${subdomain}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      naam: naam,
      categorie: categorie,
      kleur: kleur,
      materiaal: materiaal,
      beschrijving: beschrijving,
    }),
  });
  e.reset();
  const data = await response.json();
  alert(data.message);
}

async function searchInDuckList(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const searchedDuck = await searchDuck("naam", name);
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
    <li class="p-3 w-90 bg-gray-50 rounded-b-sm">
      <section class="flex gap-1 border-b-2 p-1" id=#${item.id}> 
        <button class="flex flex-1 text-xl duck-page-button"> ${item.naam} </button>
        <button class="bg-yellow-400 h-8 w-8 rounded-sm border-2 hover:cursor-pointer font-bold edite-button"> ✏️ </button>
        <button class="bg-red-400 h-8 w-8 rounded-sm border-2 hover:cursor-pointer font-bold delete-button"> X </button>
      </section>
    </li>
    `
    )
    .join("");

  const deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach((button) => {
    button.addEventListener("click", deleteDuck);
  });

  const editButton = document.querySelectorAll(".edite-button");
  editButton.forEach((button) => {
    button.addEventListener("click", updateDuck);
  });

  const duckPageButton = document.querySelectorAll(".duck-page-button");
  duckPageButton.forEach((button) => {
    button.addEventListener("click", openDuckPage);
  });
}

async function deleteDuck(e) {
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

async function updateDuck(e) {
  const button = e.target;
  const regex = /\d+/;
  const id = (button.parentNode.id.match(regex) || [""])[0];

  const duck = await searchDuck("id", id);

  const idInput = document.querySelector("#duck-form__id");
  const naamInput = document.querySelector("#duck-form__naam");
  const categorieInput = document.querySelector("#duck-form__categorie");
  const kleurInput = document.querySelector("#duck-form__kleur");
  const materiaalInput = document.querySelector("#duck-form__materiaal");
  const beschrijvingInput = document.querySelector("#duck-form__beschrijving");

  idInput.value = duck.id;
  naamInput.value = duck.naam;
  categorieInput.value = duck.categorie;
  kleurInput.value = duck.kleur;
  materiaalInput.value = duck.materiaal;
  beschrijvingInput.value = duck.beschrijving;
}
