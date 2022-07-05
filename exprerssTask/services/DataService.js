import * as path from "path";
import { readFile, writeFile } from "fs/promises";
import config from "../config/index.js";
import { ApiError } from "../errors/errors.js";

class DataService {
  _pathToFile = path.resolve(config.dataFilePath);

  async getFileContent() {
    try {
      return JSON.parse(await readFile(this._pathToFile, { encoding: "utf8" }));
    } catch (e) {
      throw e;
    }
  }

  async putFileContent(data) {
    try {
      if (!(await this.checkIfBookExists(data))) {
        const fileContent = await this.getFileContent();
        fileContent.push(data);
        await writeFile(this._pathToFile, JSON.stringify(fileContent));
        return data;
      }
    } catch (e) {
      throw e;
    }
  }

  async saveNewBook(id, newBook) {
    try {
      await this.deleteBookFromFile(id);
      await this.putFileContent(newBook);
    } catch (e) {
      throw e;
    }
  }

  async deleteBookFromFile(id) {
    try {
      const fileContent = await this.getFileContent();
      await writeFile(
        this._pathToFile,
        JSON.stringify(fileContent.filter((i) => i.id !== +id))
      );
    } catch (e) {
      throw e;
    }
  }

  async findOneBook(id) {
    try {
      const data = await this.getFileContent();
      const item = data.find((i) => i.id === +id);
      if (!item) {
        throw new ApiError(`Book with id: ${id} does not exist...`, 404);
      }
      return item;
    } catch (e) {
      throw e;
    }
  }

  async editOne(id, title) {
    try {
      const book = await this.findOneBook(id);
      const item = { ...book, title: title };
      await this.saveNewBook(id, item);
      return item;
    } catch (e) {
      throw e;
    }
  }

  async findOneReview(bookId, reviewId) {
    try {
      const book = await this.findOneBook(bookId);
      const review = book.reviews.find((book) => book.id === +reviewId);
      if (!review) {
        throw new ApiError(
          `Review with id: ${reviewId} does not exist...`,
          404
        );
      }
      return review;
    } catch (e) {
      throw e;
    }
  }

  async checkIfBookExists(bookObj) {
    try {
      const data = await this.getFileContent();
      const book = data.find((item) => item.title === bookObj.title);
      if (book) {
        throw new ApiError(`Book: ${bookObj.title} already exists`, 409);
      }
      return book;
    } catch (e) {
      throw e;
    }
  }

  async checkIfReviewExists(bookId, reviewId) {
    try {
      const book = await this.findOneBook(bookId);
      const review = book.reviews.find((review) => review.id === +reviewId);

      if (!review) {
        throw new ApiError(`Review with id: ${reviewId} doesn't exist...`, 409);
      }

      return review;
    } catch (e) {
      throw e;
    }
  }

  async addReview(bookId, review) {
    try {
      const book = await this.findOneBook(bookId);
      book.reviews.push({ ...review, id: Date.now() });
      await this.saveNewBook(bookId, book);
      return review;
    } catch (e) {
      throw e;
    }
  }

  async deleteReview(bookId, reviewObj) {
    try {
      const book = await this.findOneBook(bookId);

      const newBook = {
        ...book,
        reviews: book.reviews.filter((review) => review.id !== +reviewObj.id),
      };

      await this.saveNewBook(bookId, newBook);
      return reviewObj;
    } catch (e) {
      throw e;
    }
  }
}

export default new DataService();
