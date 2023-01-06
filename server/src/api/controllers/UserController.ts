import { Request, Response, NextFunction } from 'express';
import { getAllUsers, findUser, createUser, updateUser, deleteUser } from '../services/UserService';

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  return await getAllUsers()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
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
  const user = await findUser({ username: createUserData.username });
  if (user) {
    return res.status(400).json({ message: 'Username has been exist!' });
  }
  return await createUser(createUserData)
    .then((user: any) => {
      res.status(201).json({ user });
    })
    .catch((error: any) => {
      res.status(500).json({ error });
    });
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = req.body;
  const user = await findUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User isn't found" });
  }
  return await updateUser({ _id: userId }, update, { new: true })
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const user = await findUser({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User isn't found" });
  }
  return await deleteUser({ userId })
    .then((user) => {
      res.status(201).json({ user, message: 'Deleted user' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
