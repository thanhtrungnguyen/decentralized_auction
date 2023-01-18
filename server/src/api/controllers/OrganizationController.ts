import { createUser, getUser } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';
import { createIndividual, getIndividual } from '../services/IndividualService';
import { createOrganization, getAllOrganizations, getAllSellers, getOrganization } from '../services/OrganizationService';

export const createSellerHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const createData = req.body;
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const user = await getUser({ username: createData.username });
  if (user) {
    return res.status(400).json({ message: 'User name has been exist!' });
  }
  const existEmailIndividual = await getIndividual({ email: req.body.email });
  if (existEmailIndividual) {
    return res.status(409).json({ message: 'Email has been exist!' });
  }
  const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
  if (existPhoneIndividual) {
    return res.status(409).json({ message: 'Phone has been exist!' });
  }
  const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
  if (existCardNumberIndividual) {
    return res.status(409).json({ message: 'Card Number has been exist!' });
  }
  const userCreated = await createUser({ ...createData });
  if (userCreated) {
    const individualCreated = await createIndividual({ ...createData, user: userCreated._id }, files);
    if (individualCreated) {
      return await createOrganization({ ...createData, individual: individualCreated })
        .then((seller: any) => {
          res.status(201).json({ seller });
        })
        .catch((error: any) => {
          res.status(500).json({ error });
        });
    }
  }
};
export const getSellerHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllSellers()
    .then((listSeller: any) => {
      res.status(201).json({ listSeller });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
export const getAllHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllOrganizations()
    .then((listSeller: any) => {
      res.status(201).json({ listSeller });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
export const getSellerByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.idIndividual;
  return await getOrganization({ individual: id })
    .then((result: any) => {
      res.status(201).json({ result });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
