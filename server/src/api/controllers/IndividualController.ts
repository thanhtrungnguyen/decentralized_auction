import { Request, Response, NextFunction } from 'express';
import { getAllIndividuals, getIndividual, createIndividual, updateIndividual, deleteIndividual } from '../services/IndividualService';
import { createUser, findUser } from '../services/UserService';

export const getAllIndividualsHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllIndividuals()
    .then((individuals) => {
      res.status(200).json({ individuals });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getIndividualByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const individualId = req.params.individualId;
  return await getIndividual({ _id: individualId })
    .then((individual) => {
      res.status(200).json({ individual });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createIndividualHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const createIndividualData = req.body;
  const createUserData = req.body;
  const user = await findUser({ username: req.body.username });
  if (user) {
    return res.status(401).json({ message: 'Username has been exist!' });
  }
  const existEmailIndividual = await getIndividual({ email: req.body.email });
  if (existEmailIndividual) {
    return res.status(401).json({ message: 'Email has been exist!' });
  }
  const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
  if (existPhoneIndividual) {
    return res.status(401).json({ message: 'Phone has been exist!' });
  }
  const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
  if (existCardNumberIndividual) {
    return res.status(401).json({ message: 'Card Number has been exist!' });
  }
  const userCreated: any = await createUser({ ...createUserData, role: 'bidder' });
  if (userCreated._id) {
    return await createIndividual({ ...createIndividualData, user: userCreated._id })
      .then((individual: any) => {
        res.status(201).json({ individual });
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });
  }
};

export const updateIndividualHandler = async (req: Request, res: Response, next: NextFunction) => {
  const individualId = req.params.individualId;
  const update = req.body;
  const individual = await getIndividual({ _id: individualId });
  if (!individual) {
    return res.status(404).json({ message: "Individual isn't found" });
  }
  return await updateIndividual({ _id: individualId }, update, { new: true })
    .then((individual) => {
      res.status(201).json({ individual });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteIndividualHandler = async (req: Request, res: Response, next: NextFunction) => {
  const individualId = req.params.individualId;
  const individual = await getIndividual({ _id: individualId });
  if (!individual) {
    return res.status(404).json({ message: "Individual isn't found" });
  }
  return await deleteIndividual({ _id: individualId })
    .then((individual) => {
      res.status(201).json({ individual, message: 'Deleted individual' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};