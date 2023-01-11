import { createUser, findUser } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';
import { createIndividual, getIndividual } from '../services/IndividualService';
import { createOrganization } from '../services/OrganizationService';

export const createSellerHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const createUserData = req.body;
  const createOrganizationData = req.body;
  const createIndividualData = req.body;
  const user = await findUser({ username: createUserData.username });
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
  const userCreated = await createUser({ ...createUserData, role: 'bidder' });
  if (userCreated) {
    const individualCreated = await createIndividual({ ...createIndividualData, user: userCreated._id });
    if (individualCreated) {
      return await createOrganization({ ...createOrganizationData, individual: individualCreated._id })
        .then((seller: any) => {
          res.status(201).json({ seller });
        })
        .catch((error: any) => {
          res.status(500).json({ error });
        });
    }
  }
};
