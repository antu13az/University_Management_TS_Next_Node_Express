import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../shared/sendResponse';

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
