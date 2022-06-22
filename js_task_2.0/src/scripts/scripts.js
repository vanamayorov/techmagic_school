import Interaction from "./classes/Interaction";

const getAllPostsBtn = document.querySelector(".getAll");
const getPostByIdBtn = document.querySelector(".getById");

const loadAllEventListeners = () => {
  getAllPostsBtn.addEventListener("click", Interaction.getAllPosts);
  getPostByIdBtn.addEventListener("click", Interaction.getPostById);
};

document.addEventListener("DOMContentLoaded", loadAllEventListeners);