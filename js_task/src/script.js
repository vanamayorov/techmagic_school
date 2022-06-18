"use strict";

const list = document.querySelector(".list-group");
const deleteBtn = document.querySelector(".btn-delete");
const inputField = document.querySelector(".form-control");
const errorMsg = document.querySelector(".invalid-feedback");
const form = document.querySelector("form");

const LOCAL_STORAGE_KEY = "queue";

const renderQueue = () => {
  let queue = [];

  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  if (!queue.length) {
    list.innerHTML = "Queue is empty...";
  } else {
    list.innerHTML = "";

    for (const item of queue) {
      addItem(item.content);
    }
  }
};

const submitForm = (e) => {
  e.preventDefault();

  if (!validateInput()) {
    return;
  }

  const inputValue = e.target.item.value.trim();

  storeItemInLocalStorage(inputValue);

  renderQueue();

  inputField.value = "";
};

const addItem = (itemName) => {
  list.innerHTML += `
        <li class="list-group-item bg-info text-white border border-info mb-2">
            ${itemName}
        </li>
    `;
};

const removeItem = () => {
  let queue = [];

  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const oldestItem = queue[0];

  if (oldestItem) {
    removeItemFromLocalStorage(oldestItem);
    renderQueue();
  }
};

const validateInput = () => {
  const MAX_ITEMS = 19;

  const errorsObj = {
    empty: "Please, fill out this field to add new item.",
    maxItems: `Num of items cannot be more than ${MAX_ITEMS}`,
  };

  inputField.classList.add("is-invalid");

  if (!inputField.value.trim()) {
    errorMsg.innerHTML = errorsObj.empty;
    return false;
  }

  if (
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.length + 1 >
    MAX_ITEMS
  ) {
    errorMsg.innerHTML = errorsObj.maxItems;
    return false;
  }

  inputField.classList.remove("is-invalid");
  errorMsg.innerHTML = "";
  return true;
};

const storeItemInLocalStorage = (item) => {
  let queue = [];

  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  const itemObj = {
    id: Date.now(),
    content: item,
  };

  queue.push(itemObj);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
};

const removeItemFromLocalStorage = (item) => {
  let queue = [];

  if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
    queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  }

  queue = queue.filter((i) => i.id !== item.id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
};

const loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded", renderQueue);
  form.addEventListener("submit", submitForm);
  deleteBtn.addEventListener("click", removeItem);
};

loadEventListeners();
