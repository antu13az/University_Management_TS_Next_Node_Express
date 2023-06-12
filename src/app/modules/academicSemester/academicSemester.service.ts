import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import {
  academicSemesterSearchAbleFields,
  academicSemesterTitleAndCodeMatcher,
} from '../../../constans/academicSemester.constants';
import ApiError from '../../../errorsHandler/ApiErrors';
import { paginationHelpers } from '../../../helpers/pegenationHelper';
import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/paginationType';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponsePagination<IAcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filters;
  console.log(searchTerm);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchAbleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortCondition: { [key: string]: SortOrder } = {};
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await academicSemesterModel
    .find(whereConditions)
    .sort(sortCondition)
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
