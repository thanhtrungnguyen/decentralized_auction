import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/UserService';

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
  return await getUserById({ userId })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  return await createUser(user)
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = req.body;
  const user = await getUserById({ userId });
  if (!user) {
    return res.status(404).json({ message: "User isn't found" });
  }
  return await updateUser({ userId }, update, { new: true })
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const user = await getUserById({ userId });
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
