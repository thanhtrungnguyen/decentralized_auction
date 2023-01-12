import { Request, Response, NextFunction } from 'express';
import { createInformationOperator, getAllInformationOperator, getInformationOperator } from '../services/InformationOperatorService';
import { createUser, getUser } from '../services/UserService';

export const getAllInformationOperatorHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllInformationOperator()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getInformationOperatorHandler = async (req: Request, res: Response, next: NextFunction) => {
  const individualId = req.params.individualId;
  return await getInformationOperator({ _id: individualId })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createInformationOperatorHandler = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  const createData = req.body;
  const existUser = await getUser({ username: createData.username });
  if (existUser) {
    return res.status(409).json({ message: 'User name has been exist!' });
  }
  const existEmail = await getInformationOperator({ email: createData.email });
  if (existEmail) {
    return res.status(409).json({ message: 'Email has been exist!' });
  }
  const existPhone = await getInformationOperator({ phone: createData.phone });
  if (existPhone) {
    return res.status(409).json({ message: 'Phone has been exist!' });
  }

  const userCreated: any = await createUser({ ...createData, role: 'manager' });
  if (userCreated._id) {
    return await createInformationOperator({ ...createData, user: userCreated._id })
      .then((result: any) => {
        res.status(201).json({ result });
      })
      .catch((error: any) => {
        res.status(500).json({ error });
      });
  }
};
