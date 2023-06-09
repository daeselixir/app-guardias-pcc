const ErrorResponse = require("../errors/errorResponse");

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log({...err});

  let error = { ...err };
  error.message = err.message;
  console.log(err.name);

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = "Ressource not found";
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandlerMiddleware;
