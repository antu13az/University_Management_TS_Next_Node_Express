import { Router } from 'express';
import zodValidationRequest from '../../middlewares/zodValidateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '',
  zodValidationRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  )
);
