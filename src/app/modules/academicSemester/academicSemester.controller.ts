import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../shared/sendResponse';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Create Successfully',
      data: result,
    });
    next();
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
};
