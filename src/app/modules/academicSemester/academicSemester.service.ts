import httpStatus from 'http-status';
import { academicSemesterTitleAndCodeMatcher } from '../../../constans/academicSemester.constants';
import ApiError from '../../../errorsHandler/ApiErrors';
import {
  IGenericResponsePaginetion,
  IPaginationOptions,
} from '../../../interfaces/paginationType';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';
const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleAndCodeMatcher[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};

const getAllSemestersService = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponsePaginetion<IAcademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  const result = await academicSemesterModel
    .find()
    .sort()
    .skip(skip)
    .limit(limit);
  const total = await academicSemesterModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemestersService,
};
