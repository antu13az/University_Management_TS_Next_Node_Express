import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errorsHandler/ApiErrors';
import { academicSemesterMonths } from './academicSemester.constants';
import {
  AcademicSemesterInterfaceModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await academicSemesterModel.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist');
  } else {
    next();
  }
});

export const academicSemesterModel = model<
  IAcademicSemester,
  AcademicSemesterInterfaceModel
>('AcademicSemester', academicSemesterSchema);

// Handling Same Year and same semester issues
