import express from 'express';
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  //   deleteUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  changePasswordHandler,
  resetPasswordHandler,
  getUserByRoleHandler,
  changeStatusUserHandler
} from '../controllers/UserController';
import { UserSchema } from '../validations/UserSchema';
import { validateResource } from '../middleware/validateResource';
const router = express.Router();

router.get('/users', getAllUsersHandler);
router.get('/:userId', getUserByIdHandler);
router.post('/create', validateResource(UserSchema.create), createUserHandler);
router.patch('/update/:userId', validateResource(UserSchema.updateStatus), updateUserHandler);
router.patch('/changeStatus/:userId/:status', validateResource(UserSchema.updateStatus), changeStatusUserHandler);
// router.delete('/delete/:userId', deleteUserHandler);
router.post('/forgotPassword', validateResource(UserSchema.forgotPassword), forgotPasswordHandler);
router.post('/changePassword/:userId', validateResource(UserSchema.changePassword), changePasswordHandler);
router.post('/verify/:userId/:verificationCode', verifyUserHandler);
router.post('/resetPassword/:userId/:passwordResetCode', validateResource(UserSchema.changePassword), resetPasswordHandler);
//
router.get('/users/:role/:index/:status/:search', getUserByRoleHandler);

export default router;
