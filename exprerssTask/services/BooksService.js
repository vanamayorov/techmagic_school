import { ApiError } from "../errors/errors.js";
import DataService from "./DataService.js";

class BooksService {
  async getAllBooks() {
    try {
      const data = await DataService.getFileContent();
      return data.sort((a, b) => a.id - b.id);
    } catch (e) {
      throw new ApiError("Books not found", 404);
    }
  }

  async getOneBook(id) {
    try {
      const book = await DataService.findOneBook(id);
      return book;
    } catch (e) {
      throw e;
    }
  }

  async createBook(book) {
    try {
      const bookWithId = {
        ...book,
        id: Date.now(),
        reviews: [],
      };
      const data = await DataService.putFileContent(bookWithId);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async update(id, title) {
    try {
      const book = await DataService.editOne(id, title);
      return book;
    } catch (e) {
      throw e;
    }
  }

  async getReviews(id) {
    try {
      const book = await this.getOneBook(id);
      return book.reviews;
    } catch (e) {
      throw e;
    }
  }

  async addReview(bookId, reviewObj) {
    try {
      const review = await DataService.addReview(bookId, reviewObj);
      return review;
    } catch(e) {
      throw e;
    }
  }

  async removeReview(bookId, reviewObj) {
    try {
      const removedReview = await DataService.deleteReview(bookId, reviewObj);
      return removedReview;
    } catch (e) {
      throw e;
    }
  }
}

export default new BooksService();
