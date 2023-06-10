import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await academicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
