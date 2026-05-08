export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose Cast Error
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  // Multer file size error
  if (err.name === 'MulterError' && err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File size exceeds 5MB limit';
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};