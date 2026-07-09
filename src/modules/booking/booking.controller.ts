import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import httpStatus from "http-status";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const customerId = req.user?.id;
    const result = await bookingService.createBookingIntoDb(
      payload,
      customerId,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service booked successfully",
      data: result,
    });
  },
);

export const bookingController = {
  createBooking,
};
