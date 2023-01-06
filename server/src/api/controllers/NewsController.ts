import { Request, Response, NextFunction } from 'express';
import { getAllNews, getNews, createNews, updateNews, deleteNews } from '../services/NewsService';

export const getAllNewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllNews()
    .then((news) => {
      res.status(200).json({ news });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getNewsByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;
  return await getNews({ _id: newsId })
    .then((news) => {
      res.status(200).json({ news });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createNewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const news = req.body;
  return await createNews(news)
    .then((news) => {
      res.status(201).json({ news });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateNewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;
  const update = req.body;
  const news = await getNews({ _id: newsId });
  if (!news) {
    return res.status(404).json({ message: "News isn't found" });
  }
  return await updateNews({ _id: newsId }, update, { new: true })
    .then((news) => {
      res.status(201).json({ news });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteNewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const newsId = req.params.newsId;
  const news = await getNews({ _id: newsId });
  if (!news) {
    return res.status(404).json({ message: "News isn't found" });
  }
  return await deleteNews({ _id: newsId })
    .then((news) => {
      res.status(201).json({ news, message: 'Deleted news' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
