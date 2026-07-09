import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import httpStatus from "http-status";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await categoryService.createCategoryIntoDb(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "category created successfully",
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryService.getAllCategory();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All category retrieved successfully",
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getAllCategory,
};
