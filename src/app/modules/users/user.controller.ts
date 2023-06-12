import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create User Successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createUsers,
};
