import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getBidderFilter,
  getSellerFilter,
  getManagerFilter,
  getUser,
  validatePassword
} from '../services/UserService';
import sendEmail from '../utils/mailer';
import { createIndividual, getIndividual } from '../services/IndividualService';
import { getInformationOperator } from '../services/InformationOperatorService';
const _ = require('lodash');
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
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
  return await getUser({ _id: userId })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const createUserData = req.body;
  const user = await getUser({ username: createUserData.username });
  if (user) {
    return res.status(400).json({ message: 'User has been exist!' });
  }
  return await createUser(createUserData)
    .then(async (user: any) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: '[DAP] Verify your email',
      //   text: `Id: ${user._id} \nVerification code: ${user.verificationCode}`
      // });
      res.status(201).json({ user });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};
export const changeStatusUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = { status: req.params.status == 'true' ? true : false };
  const user = await getUser({ _id: userId });
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
export const createHandler = async (req: Request, res: Response, next: NextFunction) => {
  // const createUserData = req.body;
  // const createOrganizationData = req.body;
  // const createIndividualData = req.body;
  // const user = await getUser({ username: createUserData.username });
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
  // const user = await getUser({ _id: userId });
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
  const user = await getUser({ _id: userId });
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
  const { username } = req.body;
  let email;

  const user = await getUser({ username: username });
  if (!user) {
    return res.status(404).json({ message: 'User is not found' });
  }
  if (user.role === 'bidder' || user.role === 'seller') {
    const individual = await getIndividual({ user: user._id });
    if (!individual) {
      return res.status(404).json({ message: 'Individual is not found' });
    }
    email = individual.email;
  } else {
    const operator = await getInformationOperator({ user: user._id });
    if (!operator) {
      return res.status(404).json({ message: 'Operator is not found' });
    }
    email = operator.email;
  }
  if (!email) {
    return res.status(404).json({ message: 'Email is not found' });
  }
  const passwordResetCode = crypto.randomUUID();
  user.passwordResetCode = passwordResetCode;
  await updateUser({ _id: user._id }, { passwordResetCode }, { new: true });

  await sendEmail({
    to: email,
    from: 'test@example.com',
    subject: 'DAP - Reset your password',
    text: `http://localhost:5000/api/user/resetPassword/${user._id}/${passwordResetCode}\nhttp://20.85.218.221/api/user/resetPassword/${user._id}/${passwordResetCode}\nhttp://localhost:3000/resetPassword/${user._id}/${passwordResetCode}\nhttp://20.85.218.221/resetPassword/${user._id}/${passwordResetCode}\n`
  });
  return res.status(201).json({ message: 'Check your mail to reset your password' });
};

export const resetPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, passwordResetCode } = req.params;
  const { password } = req.body;
  const user = await getUser({ _id: userId });
  if (!user || user?.passwordResetCode === null || user?.passwordResetCode !== passwordResetCode) {
    return res.status(401).send({ message: 'Could not reset user password' });
  }
  await updateUser({ _id: user._id }, { password, passwordResetCode: null }, { new: true })
    .then((result) => {
      return res.status(201).json({ message: 'Successfully updated password' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const changePasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const { password, oldPassword } = req.body;
  const user = await getUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User isn't found" });
  }
  if (password === oldPassword) {
    return res.status(401).json({ message: 'Password is not change' });
  }
  const isValidPassword = await validatePassword({ username: user.username, password: oldPassword });
  if (!isValidPassword) {
    return res.status(401).send({ message: 'Old password is not correct' });
  }
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
//   const user = await getUser({ _id: userId });
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
