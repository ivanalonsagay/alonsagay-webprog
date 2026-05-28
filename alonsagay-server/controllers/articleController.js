import Article from '../models/Article.js';

const createSlug = (value) => {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const normalizeParagraphs = (paragraphs) => {
  if (Array.isArray(paragraphs)) {
    return paragraphs.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(paragraphs || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch articles.',
      error: error.message,
    });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    res.json({
      success: true,
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch article.',
      error: error.message,
    });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, slug, paragraphs, imageUrl, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required.',
      });
    }

    const preparedParagraphs = normalizeParagraphs(paragraphs);

    if (preparedParagraphs.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one paragraph is required.',
      });
    }

    const finalSlug = createSlug(slug || title);

    const existingArticle = await Article.findOne({ slug: finalSlug });

    if (existingArticle) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists. Please use another slug.',
      });
    }

    const article = await Article.create({
      slug: finalSlug,
      title,
      paragraphs: preparedParagraphs,
      preview: preparedParagraphs[0],
      imageUrl: imageUrl || '',
      status: status || 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to create article.',
      error: error.message,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { title, slug, paragraphs, imageUrl, status } = req.body;

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    const preparedParagraphs = normalizeParagraphs(paragraphs);
    const finalSlug = createSlug(slug || title || article.title);

    const duplicateSlug = await Article.findOne({
      slug: finalSlug,
      _id: { $ne: article._id },
    });

    if (duplicateSlug) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists. Please use another slug.',
      });
    }

    article.slug = finalSlug;
    article.title = title || article.title;
    article.paragraphs =
      preparedParagraphs.length > 0 ? preparedParagraphs : article.paragraphs;
    article.preview = article.paragraphs[0] || '';
    article.imageUrl = imageUrl || '';
    article.status = status || article.status;

    await article.save();

    res.json({
      success: true,
      message: 'Article updated successfully.',
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to update article.',
      error: error.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    await article.deleteOne();

    res.json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to delete article.',
      error: error.message,
    });
  }
};