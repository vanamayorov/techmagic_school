const User = require('../models/user');
const Article = require('../models/article');
const errorHelper = require('../config/errorHelper');

async function createUser(req, res, next) {
  try {
    const user = await User.create({...req.body});
    return res.status(201).json({data: user});
  } catch (e) {
    next(errorHelper.badRequest(e.message));
  }
}

async function editUser(req, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    })
      .lean()
      .exec();
    if (!updatedUser) {
      throw errorHelper.notFound(`User with id: ${req.params.userId} not found`);
    }

    res.status(200).json({data: updatedUser});
  } catch (e) {
    next(e);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw errorHelper.notFound(`User with id: ${req.params.userId} not found`);
    }

    const articles = await Article.find({owner: user._id});
    user.articles = articles;

    res.status(200).json({data: user});
  } catch (e) {
    next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const removedUser = await User.findById(req.params.userId);

    if (!removedUser) {
      throw errorHelper.notFound(`User with id: ${req.params.userId} not found`);
    }

    await removedUser.remove();

    await Article.deleteMany({owner: removedUser._id});

    res.status(200).json({data: removedUser});
  } catch (e) {
    next(e);
  }
}

async function getArticles(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw errorHelper.notFound(`User with id: ${req.params.userId} not found`);
    }

    const articles = await Article.find({owner: user._id});
    res.status(200).json({data: articles});
  } catch (e) {
    next(e);
  }
}

module.exports = {createUser, editUser, getUser, deleteUser, getArticles};
