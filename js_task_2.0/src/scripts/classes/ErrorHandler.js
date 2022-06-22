export default class ErrorHandler {
  static async handleError(error) {
    console.error(error);
    const errorMsg =
      error.status >= 400 && error.status < 500
        ? "Not found, unknown id"
        : "Server error, try again";

    return `
      <div class="${error.status < 500 && "display-6"} text-danger">
        ${errorMsg}
      </div>
    `;
  }
}
