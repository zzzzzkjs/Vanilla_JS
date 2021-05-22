const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LOCAL_STORAGE = "currentUser";
const SHOWING_CLASS_NAME = "showing";

function saveName(text) {
  localStorage.setItem("USER_LOCAL_STORAGE", text);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CLASS_NAME);
  greeting.classList.add(SHOWING_CLASS_NAME);
  greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CLASS_NAME);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const USER_LS = "currentUser";
  const currentUser = localStorage.getItem(USER_LOCAL_STORAGE);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
