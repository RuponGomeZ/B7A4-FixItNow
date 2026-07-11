import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/checkout",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  paymentController.createCheckOutSession,
);
router.post("/webhook", paymentController.handleWebhook);

router.get("/", auth(Role.CUSTOMER), paymentController.getPayment);
router.get("/details/:paymentId", paymentController.getPaymentDetails);

export const paymentRouter = router;
