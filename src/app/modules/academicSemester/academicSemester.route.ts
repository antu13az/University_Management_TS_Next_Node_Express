import { Router } from 'express';
import zodValidationRequest from '../../middlewares/zodValidateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-semester',
  zodValidationRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  academicSemesterController.createAcademicSemesterController
);

export const AcademicSemesterRouter = router;
