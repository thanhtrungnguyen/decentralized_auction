import { Request, Response, NextFunction } from 'express';
import { getAllNews, getNews, createNews, updateNews, deleteNews } from '../services/NewsService';

export const getAllNewsHandler = async (req: Request, res: Response, next: NextFunction) => {
  var index = req.params.index;
  var status = req.params.status;
  var search = req.params.search;
  return await getAllNews(index, status, search)
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
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  var isExist = await getNews({ title: news.title });
  if (isExist) {
    return res.status(409).json({ message: 'Title has been exist!' });
  }

  return await createNews(news, files)
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
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const news = await getNews({ _id: newsId });
  if (!news) {
    return res.status(404).json({ message: "News isn't found" });
  }
  return await updateNews({ _id: newsId }, update, { new: true }, files)
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
