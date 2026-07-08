import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage = err.message || "Internal server error";
  let errorName = err.name || "Internal Server Error";
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: err.stack,
  });
};
