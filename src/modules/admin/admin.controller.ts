import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await adminService.createCategoryIntoDb(payload);

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
    const result = await adminService.getAllCategoriesFromDb();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All category retrieved successfully",
      data: result,
    });
  },
);

export const adminController = {
  createCategory,
  getAllCategory,
};
