import BooksService from "../services/BooksService.js";

class BooksController {
  async getAll(req, res, next) {
    try {
      const data = await BooksService.getAllBooks();
      res.json({ data });
    } catch (e) {
      return next(e);
    }
  }

  async createNew(req, res, next) {
    try {
      const book = await BooksService.createBook(req.body);
      res.json(book);
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const book = await BooksService.getOneBook(id);
      res.json(book);
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const book = await BooksService.update(id, title);
      res.json(book);
    } catch (e) {
      return next(e);
    }
  }

  async getAllReviewsById(req, res, next) {
    try {
      const { id } = req.params;
      const reviews = await BooksService.getReviews(id);
      res.json(reviews);
    } catch (e) {
      return next(e);
    }
  }

  async addReview(req, res, next) {
    try {
      const { id } = req.params;
      const review = await BooksService.addReview(id, req.body);
      res.json(review);
    } catch (e) {
      return next(e);
    }
  }

  async removeReview(req, res, next) {
    try {
      const { bookId } = req.params;
      const removedReview = await BooksService.removeReview(bookId, req.review);
      res.json(removedReview);
    } catch (e) {
      return next(e);
    }
  }
}

export default new BooksController();
