import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/errorsType'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (em: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: em?.path,
        message: em?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
export default handleValidationError
