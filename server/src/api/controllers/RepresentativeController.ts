import { Request, Response, NextFunction } from 'express';
import {
  getAllRepresentatives,
  getRepresentativeById,
  createRepresentative,
  updateRepresentative,
  deleteRepresentative
} from '../services/RepresentativeService';

export const getAllRepresentativesHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllRepresentatives()
    .then((representatives) => {
      res.status(200).json({ representatives });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getRepresentativeByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const representativeId = req.params.representativeId;
  return await getRepresentativeById({ representativeId })
    .then((representative) => {
      res.status(200).json({ representative });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createRepresentativeHandler = async (req: Request, res: Response, next: NextFunction) => {
  const representative = req.body;
  return await createRepresentative(representative)
    .then((representative) => {
      res.status(201).json({ representative });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateRepresentativeHandler = async (req: Request, res: Response, next: NextFunction) => {
  const representativeId = req.params.representativeId;
  const update = req.body;
  const representative = await getRepresentativeById({ representativeId });
  if (!representative) {
    return res.status(404).json({ message: "Representative isn't found" });
  }
  return await updateRepresentative({ representativeId }, update, { new: true })
    .then((representative) => {
      res.status(201).json({ representative });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteRepresentativeHandler = async (req: Request, res: Response, next: NextFunction) => {
  const representativeId = req.params.representativeId;
  const representative = await getRepresentativeById({ representativeId });
  if (!representative) {
    return res.status(404).json({ message: "Representative isn't found" });
  }
  return await deleteRepresentative({ representativeId })
    .then((representative) => {
      res.status(201).json({ representative, message: 'Deleted representative' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
