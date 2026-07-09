import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { availabilityService } from "./availability.service";

const createAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const technicianId = req.user?.id;
    const result = await availabilityService.createAvailabilityIntoDb(
      payload,
      technicianId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability slot creation successful",
      data: result,
    });
  },
);

export const availabilityController = { createAvailability };
