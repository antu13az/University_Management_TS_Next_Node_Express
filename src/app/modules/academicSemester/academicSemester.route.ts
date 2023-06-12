import { Router } from 'express';
import { AcademicSemesterValidation } from '../../../ZodValidation/academicSemester.validation';
import zodValidationRequest from '../../middlewares/zodValidateRequest';
import { academicSemesterController } from './academicSemester.controller';

const router = Router();

router.post(
  '/create-semester',
  zodValidationRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  academicSemesterController.createAcademicSemesterController
);
router.get('/', academicSemesterController.getAllSemestersController);

export const AcademicSemesterRoute = router;
