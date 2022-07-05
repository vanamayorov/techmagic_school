import Router from "express";
import BooksController from "../controllers/BooksController.js";
import BooksMiddleware from "../middlewares/BooksMidlleware.js";

const router = Router();

router.get("/books", BooksController.getAll);
router.post("/book", BooksMiddleware.checkBook, BooksController.createNew);

router
  .route("/book/:id")
  .get(BooksController.getOne)
  .put(BooksController.update);

router.route("/book/:id/reviews").get(BooksController.getAllReviewsById);

router.route("/book/:id/review").post(BooksController.addReview);

router
  .route("/book/:bookId/review/:reviewId")
  .delete(BooksMiddleware.checkReview, BooksController.removeReview);

export default router;
