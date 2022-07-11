const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controllers');

router
  .post('/', articleController.createArticle)
  .put('/:articleId', articleController.editArticle)
  .get('/', articleController.getArticles)
  .delete('/:articleId', articleController.deleteArticle);

module.exports = router;
