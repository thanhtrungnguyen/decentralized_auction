import { createUser, getUser } from '../services/UserService';
import { Request, Response, NextFunction } from 'express';
import { createIndividual, getIndividual, updateIndividual } from '../services/IndividualService';
import {
  createOrganization,
  getAllOrganizations,
  getAllSellers,
  getOrganization,
  getOrganizationByUserId,
  updateOrganization
} from '../services/OrganizationService';

export const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const createData = req.body;
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const user = await getUser({ username: createData.username });
  if (user) {
    return res.status(400).json({ message: 'User name has been exist!' });
  }
  const existOrganizationName = await getOrganization({ name: req.body.name });
  if (existOrganizationName) {
    return res.status(409).json({ message: 'Organization name has been exist!' });
  }
  const existOrganizationTaxCode = await getOrganization({ taxCode: req.body.taxCode });
  if (existOrganizationTaxCode) {
    return res.status(409).json({ message: 'Tax Code has been exist!' });
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
export const updateHandler = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updateData = req.body;
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const sellerInformation = await getOrganization({ individual: id });
  if (!sellerInformation) {
    return res.status(404).json({ message: "Seller isn't found" });
  }
  if (
    sellerInformation.name === updateData.name &&
    sellerInformation.taxCode === updateData.taxCode &&
    sellerInformation.taxCodeGrantedDate === updateData.taxCodeGrantedDate &&
    sellerInformation.taxCodeGrantedPlace === updateData.taxCodeGrantedPlace &&
    sellerInformation.addressOrganization === updateData.addressOrganization &&
    sellerInformation.individual.firstName === updateData.firstName &&
    sellerInformation.individual.lastName === updateData.lastName &&
    sellerInformation.individual.gender === updateData.gender &&
    sellerInformation.individual.dateOfBirth === updateData.dateOfBirth &&
    sellerInformation.individual.email === updateData.email &&
    sellerInformation.individual.phone === updateData.phone &&
    sellerInformation.individual.city === updateData.city &&
    sellerInformation.individual.cityId === updateData.cityId &&
    sellerInformation.individual.wards === updateData.wards &&
    sellerInformation.individual.wardsId === updateData.wardsId &&
    sellerInformation.individual.district === updateData.district &&
    sellerInformation.individual.districtId === updateData.districtId &&
    sellerInformation.individual.address === updateData.address &&
    sellerInformation.individual.cardNumber === updateData.cardNumber &&
    sellerInformation.individual.cardGrantedPlace === updateData.cardGrantedPlace &&
    sellerInformation.individual.cardGrantedDate === updateData.cardGrantedDate &&
    Object.keys(files).length === 0
  ) {
    return res.status(409).json({ message: 'Your profile is unchanged, please edit information before save !!!' });
  }
  if (sellerInformation?.name != updateData.name) {
    const existOrganizationName = await getOrganization({ name: req.body.name });
    if (existOrganizationName) {
      return res.status(409).json({ message: 'Organization name has been exist!' });
    }
  }
  if (sellerInformation?.taxCode != updateData.taxCode) {
    const existOrganizationTaxCode = await getOrganization({ taxCode: req.body.taxCode });
    if (existOrganizationTaxCode) {
      return res.status(409).json({ message: 'Tax Code has been exist!' });
    }
  }

  if (sellerInformation?.individual.email != updateData.email) {
    const existEmailIndividual = await getIndividual({ email: req.body.email });
    if (existEmailIndividual) {
      return res.status(409).json({ message: 'Email has been exist!' });
    }
  }
  if (sellerInformation?.individual.phone != updateData.phone) {
    const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
    if (existPhoneIndividual) {
      return res.status(409).json({ message: 'Phone has been exist!' });
    }
  }
  if (sellerInformation?.individual.cardNumber != updateData.cardNumber) {
    const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
    if (existCardNumberIndividual) {
      return res.status(409).json({ message: 'Card Number has been exist!' });
    }
  }
  await updateIndividual({ _id: id }, updateData, { new: true }, files);

  return await updateOrganization({ _id: sellerInformation?._id }, updateData, { new: true })
    .then((seller: any) => {
      res.status(201).json({ seller });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
export const updateBidderHandler = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updateData = req.body;
  const files = req.files as { [fieldName: string]: Express.Multer.File[] };
  const individual = await getIndividual({ user: id });
  const sellerInformation = await getOrganization({ individual: individual });
  if (!sellerInformation) {
    return res.status(404).json({ message: "Seller isn't found" });
  }
  if (
    sellerInformation.name === updateData.name &&
    sellerInformation.taxCode === updateData.taxCode &&
    sellerInformation.taxCodeGrantedDate === updateData.taxCodeGrantedDate &&
    sellerInformation.taxCodeGrantedPlace === updateData.taxCodeGrantedPlace &&
    sellerInformation.addressOrganization === updateData.addressOrganization &&
    sellerInformation.individual.firstName === updateData.firstName &&
    sellerInformation.individual.lastName === updateData.lastName &&
    sellerInformation.individual.gender === updateData.gender &&
    sellerInformation.individual.dateOfBirth === updateData.dateOfBirth &&
    sellerInformation.individual.email === updateData.email &&
    sellerInformation.individual.phone === updateData.phone &&
    sellerInformation.individual.city === updateData.city &&
    sellerInformation.individual.cityId === updateData.cityId &&
    sellerInformation.individual.wards === updateData.wards &&
    sellerInformation.individual.wardsId === updateData.wardsId &&
    sellerInformation.individual.district === updateData.district &&
    sellerInformation.individual.districtId === updateData.districtId &&
    sellerInformation.individual.address === updateData.address &&
    sellerInformation.individual.cardNumber === updateData.cardNumber &&
    sellerInformation.individual.cardGrantedPlace === updateData.cardGrantedPlace &&
    sellerInformation.individual.cardGrantedDate === updateData.cardGrantedDate &&
    Object.keys(files).length === 0
  ) {
    return res.status(409).json({ message: 'Your profile is unchanged, please edit information before save !!!' });
  }
  if (sellerInformation?.name != updateData.name) {
    const existOrganizationName = await getOrganization({ name: req.body.name });
    if (existOrganizationName) {
      return res.status(409).json({ message: 'Organization name has been exist!' });
    }
  }
  if (sellerInformation?.taxCode != updateData.taxCode) {
    const existOrganizationTaxCode = await getOrganization({ taxCode: req.body.taxCode });
    if (existOrganizationTaxCode) {
      return res.status(409).json({ message: 'Tax Code has been exist!' });
    }
  }

  if (sellerInformation?.individual.email != updateData.email) {
    const existEmailIndividual = await getIndividual({ email: req.body.email });
    if (existEmailIndividual) {
      return res.status(409).json({ message: 'Email has been exist!' });
    }
  }
  if (sellerInformation?.individual.phone != updateData.phone) {
    const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
    if (existPhoneIndividual) {
      return res.status(409).json({ message: 'Phone has been exist!' });
    }
  }
  if (sellerInformation?.individual.cardNumber != updateData.cardNumber) {
    const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
    if (existCardNumberIndividual) {
      return res.status(409).json({ message: 'Card Number has been exist!' });
    }
  }
  await updateIndividual({ _id: individual }, updateData, { new: true }, files);

  return await updateOrganization({ _id: sellerInformation?._id }, updateData, { new: true })
    .then((seller: any) => {
      res.status(201).json({ seller });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
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
export const getByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return await getOrganizationByUserId(userId)
    .then((result: any) => {
      res.status(201).json({ result });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
