import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authController } from "./modules/auth/auth.controller";
import { authRouter } from "./modules/auth/auth.route";
import { technicianRouter } from "./modules/technician/technician.route";
import { serviceRouter } from "./modules/services/services.route";
import { availabilityRouter } from "./modules/availability/availability.route";
import { notFound } from "./middlewares/notFound";
import { bookingRouter } from "./modules/booking/booking.router";
import { reviewRouter } from "./modules/reviews/review.route";
import { adminRouter } from "./modules/admin/admin.route";
import { paymentRouter } from "./modules/payments/payment.router";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/technician", technicianRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
