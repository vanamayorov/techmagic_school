import ApiService from "./ApiService";
import { API_URL, getById } from "../config/config";
import ErrorHandler from "./ErrorHandler";
import { renderPost } from "../utils";

const mainList = document.querySelector(".main-list");
const loader = document.querySelector(".spinner-block");
const input = document.querySelector("input[name=post_id]");

export default class Interaction {
  static async getAllPosts() {
    mainList.innerHTML = "";

    try {
      loader.classList.add("active");
      const posts = await ApiService.get(API_URL);
      for (const post of posts) {
        mainList.append(renderPost(post));
      }
    } catch (err) {
      const error = await ErrorHandler.handleError(err);
      mainList.innerHTML = error;
    } finally {
      loader.classList.remove("active");
    }
  }

  static async getPostById() {
    const errorBlock = document.querySelector(".invalid-feedback");

    input.classList.remove("is-invalid");
    errorBlock.innerHTML = "";

    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      errorBlock.innerHTML = "Enter post id";
      return;
    }

    const id = input.value.trim();
    mainList.innerHTML = "";
    input.value = "";

    try {
      loader.classList.add("active");
      const post = await ApiService.get(getById(id));
      mainList.append(renderPost(post));
    } catch (err) {
      const error = await ErrorHandler.handleError(err);
      mainList.innerHTML = error;
    } finally {
      loader.classList.remove("active");
    }
  }

  static async updatePost(e) {
    const card = e.target.closest(".card");
    const id = card.dataset.id;
    const titleContent = card.querySelector(".card-title-textarea");
    const textareaContent = card.querySelector(".body-textarea");
    const userIdInput = card.querySelector(".user-id-input");

    try {
      card.classList.add("load");
      const result = await ApiService.put(getById(id), {
        id,
        title: titleContent.value.trim(),
        body: textareaContent.value.trim(),
        userId: userIdInput.value.trim(),
      });

      const { body, userId, title } = result;

      card.querySelector(".card-content").innerHTML = body;
      card.querySelector(".user-id").innerHTML = `User Id: ${userId}`;
      userIdInput.value = userId;
      card.querySelector(".card-title").innerHTML = title;
      titleContent.value = title;
    } catch (err) {
      const error = await ErrorHandler.handleError(err);
      userId.insertAdjacentHTML("afterend", error);
    } finally {
      card.classList.remove("edit");
      card.classList.remove("load");
    }
  }
}
