import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";

const createCheckOutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await paymentService.createCheckOutSessionIntoDB(
      userId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout completed successfully",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //  const payload = req.body;
    // const signature = req.headers["stripe-signature"];
    // await paymentService.
  },
);

export const paymentController = {
  createCheckOutSession,
  handleWebhook,
};
