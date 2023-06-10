import config from '../../../config';
import ApiError from '../../../errorsHandler/ApiErrors';
import { IUser } from './user.interface';
import { CreateUserModel } from './user.model';

import { generatedUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id

  const id = await generatedUserId();

  user.id = id;

  // Default password

  if (!user.password) {
    user.password = config.default_user_Pass as string;
  }
  // Here User is come form the user model
  const createUser = await CreateUserModel.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Could not create user');
  }
  return createUser;
};

export const userService = {
  createUser,
};
