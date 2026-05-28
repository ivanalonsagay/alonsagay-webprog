import axios from 'axios';

import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

API.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch {
    // Continue without token.
  }

  return config;
});

const createSlug = (value) => {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const normalizeParagraphs = (article) => {
  if (Array.isArray(article.paragraphs)) {
    return article.paragraphs;
  }

  if (Array.isArray(article.content)) {
    return article.content;
  }

  if (typeof article.paragraphs === 'string') {
    return article.paragraphs
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof article.content === 'string') {
    return article.content
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (article.description) {
    return [article.description];
  }

  return [];
};

const normalizeArticle = (article) => {
  const paragraphs = normalizeParagraphs(article);
  const id = article._id || article.id;

  return {
    ...article,
    id,
    _id: article._id || id,
    slug: article.slug || article.name || createSlug(article.title),
    title: article.title || '',
    paragraphs,
    preview: article.preview || paragraphs[0] || '',
    status:
      article.status ||
      (article.isActive === false || article.active === false
        ? 'inactive'
        : 'active'),
    imageUrl: article.imageUrl || article.image || '',
  };
};

const normalizeListResponse = (response) => {
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map(normalizeArticle);
  }

  if (Array.isArray(data.articles)) {
    return data.articles.map(normalizeArticle);
  }

  if (Array.isArray(data.data)) {
    return data.data.map(normalizeArticle);
  }

  return [];
};

const normalizeSingleResponse = (response) => {
  const data = response.data;

  if (data.article) {
    return normalizeArticle(data.article);
  }

  if (data.data) {
    return normalizeArticle(data.data);
  }

  return normalizeArticle(data);
};

const prepareArticlePayload = (articleData) => {
  const paragraphs = Array.isArray(articleData.paragraphs)
    ? articleData.paragraphs
    : String(articleData.paragraphs || '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    slug: articleData.slug || createSlug(articleData.title),
    title: articleData.title,
    paragraphs,
    preview: paragraphs[0] || '',
    status: articleData.status || 'active',
    imageUrl: articleData.imageUrl || '',
  };
};

export const getArticles = async () => {
  const response = await API.get('/');

  return normalizeListResponse(response);
};

export const fetchArticles = getArticles;

export const fetchArticleById = async (id) => {
  const response = await API.get(`/${id}`);

  return normalizeSingleResponse(response);
};

export const createArticle = async (articleData) => {
  const response = await API.post('/', prepareArticlePayload(articleData));

  return normalizeSingleResponse(response);
};

export const updateArticle = async (id, articleData) => {
  const response = await API.put(`/${id}`, prepareArticlePayload(articleData));

  return normalizeSingleResponse(response);
};

export const deleteArticle = async (id) => {
  const response = await API.delete(`/${id}`);

  return response.data;
};

const ArticleService = {
  getArticles,
  fetchArticles,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default ArticleService;