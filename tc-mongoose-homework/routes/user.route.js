const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');

router
  .post('/', userController.createUser)
  .put('/:userId', userController.editUser)
  .get('/:userId', userController.getUser)
  .delete('/:userId', userController.deleteUser)
  .get('/:userId/articles', userController.getArticles);

module.exports = router;
