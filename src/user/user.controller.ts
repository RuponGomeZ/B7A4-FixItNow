import { catchAsync, sendResponse } from "../utils/catchAsync";
import { userService } from "./user.service";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const user = await userService.registerUserIntoDb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered Successfully",
    data: { user },
  });
});

export const userController = {
  registerUser,
};
