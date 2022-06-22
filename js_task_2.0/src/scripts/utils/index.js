import Interaction from "../classes/Interaction";

export const renderPost = (postObj) => {
  const post = document.createElement("div");
  post.className = "col-4 mb-2";

  const postCard = document.createElement("div");
  postCard.className = "card";
  postCard.dataset.id = postObj.id;

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = `<b>Id: ${postObj.id}</b>`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  cardBody.innerHTML = `
          <h5 class="card-title">${postObj.title}</h5>
            <label class="card-title-label mb-2">
            Ttile:
              <textarea class="card-title-textarea form-control">${postObj.title}</textarea>
            </label>
          <p class="user-id">
            User Id: ${postObj.userId}
          </p>
          <label class="user-id-label mb-2">
          User Id:
            <input class="user-id-input form-control" type="text" value="${postObj.userId}">
          </label>
          <p class="card-text card-content">${postObj.body}</p>
          <div class="text-center spinner">
            <div class="spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <textarea class="body-textarea form-control mb-2">${postObj.body}</textarea>
          `;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn btn-primary";
  toggleBtn.innerHTML = "Change post";
  toggleBtn.addEventListener("click", function () {
    this.closest(".card").classList.add("edit");
  });

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-success";
  editBtn.innerHTML = "Edit post";

  editBtn.addEventListener("click", Interaction.updatePost);
  cardBody.append(toggleBtn, editBtn);

  postCard.append(cardHeader, cardBody);
  post.append(postCard);
  return post;
};
