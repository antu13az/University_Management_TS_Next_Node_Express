import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import handleValidationError from '../../errorsHandler/handleValidetionError'
import { IGenericErrorMessage } from '../../interfaces/errorsType'
import ApiError from '../../errorsHandler/ApiErrors'

const globalErrorHandlers = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandlers
