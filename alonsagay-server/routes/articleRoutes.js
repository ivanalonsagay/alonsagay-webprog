const express = require('express');

const {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;