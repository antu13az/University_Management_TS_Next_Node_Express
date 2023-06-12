import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constans/pegination.constans';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';
import { academicSemesterFilterAbleFields } from '../../../constans/academicSemester.constants';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Create Successfully',
      data: result,
    });
    next();
  }
);

const getAllSemestersController = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);

    const filters = pick(req.query, academicSemesterFilterAbleFields);

    // console.log(req.query);
    // console.log(filters);
    const result = await AcademicSemesterService.getAllSemestersService(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllSemestersController,
};
