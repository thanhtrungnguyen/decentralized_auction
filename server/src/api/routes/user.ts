import express from 'express';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/UserController';
// import { Schema, ValidateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/users', getAllUsersHandler);
router.get('/:userId', getUserByIdHandler);
router.post('/create', createUserHandler);
router.patch('/update/:userId', updateUserHandler);
router.delete('/delete/:userId', deleteUserHandler);

export default router;
