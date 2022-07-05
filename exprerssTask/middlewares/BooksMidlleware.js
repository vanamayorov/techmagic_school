import { ApiError } from "../errors/errors.js";
import DataService from "../services/DataService.js";

class BooksMiddleware {
  async checkBook(req, res, next) {
    try {
      await DataService.checkIfBookExists(req.body);
      next();
    } catch (e) {
      return next(e);
    }
  }

  async checkReview(req, res, next) {
    try {
      const { bookId, reviewId } = req.params;
      const review = await DataService.checkIfReviewExists(bookId, reviewId);
      if (!review) {
        throw new ApiError(`Review with id: ${reviewId} doesn't exist`);
      }
      req.review = review;
      next();
    } catch (e) {
      return next(e);
    }
  }
}

export default new BooksMiddleware();