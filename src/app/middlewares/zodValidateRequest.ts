import { NextFunction, Request, Response } from 'express';
// import { userService } from "../modules/users/user.service"
import { AnyZodObject } from 'zod';

const zodValidationRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default zodValidationRequest;
