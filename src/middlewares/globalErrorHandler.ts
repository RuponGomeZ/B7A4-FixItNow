import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: {
      statusCode,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};
