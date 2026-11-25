import { ApiError } from '../utils/ApiError.js';

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const isApiError = error instanceof ApiError;
  const statusCode = isApiError ? error.statusCode : 500;

  if (!isApiError) {
    console.error(error);
  }

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message: isApiError
      ? error.message
      : 'Something went wrong. Please try again.',
    errors: isApiError ? error.errors : [],
    data: null,
  });
};

export { errorHandler };
