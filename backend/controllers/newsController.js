import News from '../models/News.js';

export const getNews = async (req, res) => {
  const news = await News.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(news);
};

export const getNewsById = async (req, res) => {
  const newsItem = await News.findById(req.params.id);
  if (!newsItem) return res.status(404).json({ message: 'News not found' });
  res.json(newsItem);
};

export const createNews = async (req, res) => {
  const news = await News.create(req.body);
  res.status(201).json(news);
};

export const updateNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'News not found' });
  const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'News not found' });
  await news.deleteOne();
  res.json({ message: 'News deleted' });
};