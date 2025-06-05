"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  if (getCookie("loggedIn") === "true") {
    window.location.href = "index.html";
  }

  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", handleLogin);

  const registerForm = document.querySelector("#register-form");
  registerForm.addEventListener("submit", handleRegister);

  const switchButtons = document.querySelectorAll(".form-switch-button");
  switchButtons.forEach((button) => {
    button.addEventListener("click", toggleForms);
  });
}

async function handleRegister(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch("http://localhost:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registered successfully!");
      console.log(JSON.parse(data));
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error("Registration failed:", err);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      document.cookie = "loggedIn=true; path=/; max-age=" + 30 * 24 * 60 * 60;
      window.location.href = "index.html";
    } else {
      alert("Login failed: " + data.error);
    }
  } catch (err) {
    console.error("Login failed:", err);
  }
}

function toggleForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.classList.toggle("hidden");
  });
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}
