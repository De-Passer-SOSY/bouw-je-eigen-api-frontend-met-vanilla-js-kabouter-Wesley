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

async function AddToDuckList(e) {}

async function searchInDuckList(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const allDucks = await requestAPI();
  const filteredDucks = allDucks.filter((duck) => duck.naam === name);
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
  content.map((item) => {
    const li = document.createElement("li");
    li.textContent = item.naam;
    parent.appendChild(li);
  });
}
