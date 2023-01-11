import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  getBidderFilter,
  getSellerFilter,
  getManagerFilter
} from '../services/UserService';
import sendEmail from '../utils/mailer';
import { createIndividual, getIndividual } from '../services/IndividualService';
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getUserByRoleHandler = async (req: Request, res: Response, next: NextFunction) => {
  const role = req.params.role;
  const index = req.params.index;
  const status = req.params.status;
  const search = req.params.search;
  if (role == 'bidder') {
    return await getBidderFilter(index, status, search)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
  if (role == 'seller') {
    return await getSellerFilter(index, status, search)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
  if (role == 'manager') {
    return await getManagerFilter(index, status, search)
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};
export const getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return await findUser({ _id: userId })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const createUserData = req.body;
  const user = await findUser({ userName: createUserData.userName });
  if (user) {
    return res.status(400).json({ message: 'Email has been exist!' });
  }
  return await createUser(createUserData)
    .then(async (user: any) => {
      await sendEmail({
        to: user.email,
        subject: '[DAP] Verify your email',
        text: `Id: ${user._id} \nVerification code: ${user.verificationCode}`
      });
      res.status(201).json({ user });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
export const changeStatusUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = { status: req.params.status == 'true' ? true : false };
  const user = await findUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: 'User is not found' });
  }
  return await updateUser({ _id: userId }, update, { new: true })
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const createSellerHandler = async (req: Request, res: Response, next: NextFunction) => {
  // const createUserData = req.body;
  // const createOrganizationData = req.body;
  // const createIndividualData = req.body;
  // const user = await findUser({ username: createUserData.username });
  // if (user) {
  //   return res.status(400).json({ message: 'User name has been exist!' });
  // }
  // const existEmailIndividual = await getIndividual({ email: req.body.email });
  // if (existEmailIndividual) {
  //   return res.status(409).json({ message: 'Email has been exist!' });
  // }
  // const existPhoneIndividual = await getIndividual({ phone: req.body.phone });
  // if (existPhoneIndividual) {
  //   return res.status(409).json({ message: 'Phone has been exist!' });
  // }
  // const existCardNumberIndividual = await getIndividual({ cardNumber: req.body.cardNumber });
  // if (existCardNumberIndividual) {
  //   return res.status(409).json({ message: 'Card Number has been exist!' });
  // }
  // const userCreated: any = await createUser({ ...createUserData, role: 'bidder' });
  // if (userCreated._id) {
  //   return await createIndividual({ ...createIndividualData, user: userCreated._id })
  //     .then((individual: any) => {
  //       res.status(201).json({ individual });
  //     })
  //     .catch((error: any) => {
  //       res.status(500).json({ error });
  //     });
  // }
  // await createUser(createUserData)
  //   .then(async (user: any) => {
  //     await sendEmail({
  //       to: user.userName,
  //       subject: '[DAP] Verify your email',
  //       text: `Id: ${user._id} \nVerification code: ${user.verificationCode}`
  //     });
  //     res.status(201).json({ user });
  //   })
  //   .catch((error: any) => {
  //     res.status(500).json({ error });
  //   });
};
export const verifyUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.params.userId;
  // const verificationCode = req.params.verificationCode;
  // const user = await findUser({ _id: userId });
  // if (!user) {
  //   return res.status(409).json({ message: "User isn't found" });
  // }
  // if (user.verified) {
  //   return res.status(409).json({ message: 'User has been verified' });
  // }
  // if (user.verificationCode == verificationCode) {
  //   user.verified = true;
  //   await updateUser({ _id: userId }, { verified: true }, { new: true });
  //   await sendEmail({
  //     to: user.email,
  //     subject: '[DAP] User successfully verified',
  //     text: `User successfully verified!!!`
  //   });
  //   return res.status(201).json({ message: 'User successfully verified' });
  // }
  // return res.status(500).json({ message: 'Verification failed' });
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = req.body;
  const user = await findUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: 'User is not found' });
  }
  return await updateUser({ _id: userId }, update, { new: true })
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const forgotPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  // const { email } = req.body;
  // const user = await findUser({ email: email });
  // if (!user) {
  //   return res.status(404).json({ message: 'User is not found' });
  // }
  // if (!user.verified) {
  //   return res.status(409).json({ message: 'User was not verified' });
  // }
  // const passwordResetCode = crypto.randomUUID();
  // user.passwordResetCode = passwordResetCode;
  // await updateUser({ _id: user._id }, { passwordResetCode }, { new: true });
  // await sendEmail({
  //   to: user.email,
  //   from: 'test@example.com',
  //   subject: 'Reset your password',
  //   text: `Id ${user._id}\nPassword reset code: ${passwordResetCode}`
  // });
  // return res.status(201).json({ message: 'Check your mail to reset your password' });
};

export const resetPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, passwordResetCode } = req.params;
  const { password } = req.body;
  const user = await findUser({ _id: userId });
  if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
    return res.status(400).send('Could not reset user password');
  }
  user.passwordResetCode = null;
  user.password = password;
  await updateUser({ _id: user._id }, { password }, { new: true })
    .then((result) => {
      return res.status(201).json({ message: 'Successfully updated password' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const changePasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const { password } = req.body;
  const user = await findUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User isn't found" });
  }
  user.password = password;
  await await updateUser({ _id: user._id }, { password }, { new: true })
    .then((result) => {
      return res.status(201).json({ message: 'Successfully updated password' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.params.userId;
//   const user = await findUser({ _id: userId });
//   if (!user) {
//     return res.status(404).json({ message: "User isn't found" });
//   }
//   return await deleteUser({ userId })
//     .then((user) => {
//       res.status(201).json({ user, message: 'Deleted user' });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
