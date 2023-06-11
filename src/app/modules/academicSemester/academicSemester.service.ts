import ApiError from '../../../errorsHandler/ApiErrors';
import { academicSemesterTitleAndCodeMatcher } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';
import httpStatus from 'http-status';
const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleAndCodeMatcher[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
