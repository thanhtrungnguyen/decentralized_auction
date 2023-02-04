import { Request, Response, NextFunction } from 'express';
import { getAllIndividuals, getIndividual, createIndividual, updateIndividual, deleteIndividual } from '../services/IndividualService';
import { createUser, getUser } from '../services/UserService';

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
export const getIndividualByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return await getIndividual({ user: userId })
    .then((individual) => {
      res.status(200).json({ individual });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createIndividualHandler = async (req: Request, res: Response, next: NextFunction) => {
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
  const userCreated: any = await createUser({ ...createData, role: 'bidder' });
  if (userCreated._id) {
    return await createIndividual({ ...createData, user: userCreated._id }, files)
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
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const individual = await getIndividual({ _id: individualId });

  if (!individual) {
    return res.status(404).json({ message: "Individual isn't found" });
  }
  if (
    individual.firstName === update.firstName &&
    individual.lastName === update.lastName &&
    individual.gender === update.gender &&
    individual.dateOfBirth === update.dateOfBirth &&
    individual.email === update.email &&
    individual.phone === update.phone &&
    individual.city === update.city &&
    individual.cityId === update.cityId &&
    individual.wards === update.wards &&
    individual.wardsId === update.wardsId &&
    individual.district === update.district &&
    individual.districtId === update.districtId &&
    individual.address === update.address &&
    individual.cardNumber === update.cardNumber &&
    individual.cardGrantedPlace === update.cardGrantedPlace &&
    individual.cardGrantedDate === update.cardGrantedDate &&
    Object.keys(files).length === 0
  ) {
    return res.status(409).json({ message: 'Your profile is unchanged, please edit information before save !!!' });
  }
  if (individual.email != update.email) {
    const existEmailIndividual = await getIndividual({ email: req.body.email });
    if (existEmailIndividual) {
      return res.status(409).json({ message: 'Email has been exist!' });
    }
  }
  if (individual.phone != update.phone) {
    const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
    if (existPhoneIndividual) {
      return res.status(409).json({ message: 'Phone has been exist!' });
    }
  }
  if (individual.cardNumber != update.cardNumber) {
    const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
    if (existCardNumberIndividual) {
      return res.status(409).json({ message: 'Card Number has been exist!' });
    }
  }
  return await updateIndividual({ _id: individualId }, update, { new: true }, files)
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
