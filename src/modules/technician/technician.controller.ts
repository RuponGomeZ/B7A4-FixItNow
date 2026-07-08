import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

const createTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { id } = req.user as JwtPayload;
    console.log("from bio", payload);
    const createProfile = await technicianService.createTechnicianProfileIntoDb(
      payload,
      id,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile Created Successfully",
      data: createProfile,
    });
  },
);

const getAllTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await technicianService.getAllTechnicianFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician Profile Created Successfully",
      data: result,
    });
  },
);

export const technicianController = {
  createTechnicianProfile,
  getAllTechnician,
};
