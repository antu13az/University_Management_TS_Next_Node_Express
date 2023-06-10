import express from 'express';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';
import zodValidationRequest from '../../middlewares/zodValidateRequest';

const router = express.Router();

router.post(
  '/create-user',
  zodValidationRequest(userValidation.createUserZodSchema),
  UserController.createUsers
);

export const UserRoutes = router;
