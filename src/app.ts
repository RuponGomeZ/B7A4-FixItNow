import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouter } from "./modules/user/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authController } from "./modules/auth/auth.controller";
import { authRouter } from "./modules/auth/auth.route";
import { technicianRouter } from "./modules/technician/technician.route";
import { categoryRouter } from "./modules/category/category.route";
import { serviceRouter } from "./modules/services/services.route";
import { availabilityRouter } from "./modules/availibility/availability.route";
import { notFound } from "./middlewares/notFound";

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
app.use("/api/admin/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availability", availabilityRouter);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
