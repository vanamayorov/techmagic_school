const Article = require('../models/article');
const User = require('../models/user');
const errorHelper = require('../config/errorHelper');

async function createArticle(req, res, next) {
  try {
    const owner = await User.findById(req.body.owner);
    if (!owner) {
      throw errorHelper.notFound(`Owner with id: ${req.body.owner} not found`);
    }

    const newArticle = await Article.create(req.body);
    owner.numberOfArticles++;
    await owner.save();

    return res.status(201).json({data: newArticle});
  } catch (e) {
    next(errorHelper.badRequest(e.message));
  }
}

async function editArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      throw errorHelper.notFound(`Article with id: ${req.params.articleId} not found`);
    }

    const owner = await User.findById(req.body.owner);

    if (!owner) {
      throw errorHelper.notFound(`Owner with id: ${req.body.owner} not found`);
    }

    const newArticle = await Article.findByIdAndUpdate(req.params.articleId, req.body, {
      new: true
    })
      .lean()
      .exec();

    return res.status(200).json({data: newArticle});
  } catch (e) {
    next(e);
  }
}

async function getArticles(req, res, next) {
  try {
    const queryString = req.query;
    const articles = await Article.find(queryString).populate('owner');
    return res.status(200).json({data: articles});
  } catch (e) {
    next(e);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      throw errorHelper.notFound(`Article with id: ${req.params.articleId} not found`);
    }
    await article.remove();
    const owner = await User.findById(req.body.owner);
    owner.numberOfArticles--;
    await owner.save();
    return res.status(200).json({data: article});
  } catch (e) {
    next(e);
  }
}

module.exports = {createArticle, editArticle, getArticles, deleteArticle};
