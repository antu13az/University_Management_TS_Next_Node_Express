import { Schema, model } from 'mongoose';
import { academicSemesterMonths } from './academicSemester.constants';
import {
  AcademicSemesterInterfaceModel,
  IAcademicSemester,
} from './academicSemester.interface';
//   title: string
//   year: number
//   code: string
//   startMonth: string
//   endMonth: string

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

export const academicSemesterModel = model<
  IAcademicSemester,
  AcademicSemesterInterfaceModel
>('AcademicSemester', academicSemesterSchema);
