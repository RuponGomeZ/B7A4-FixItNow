import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router.get("/categories", auth(Role.ADMIN), adminController.getAllCategory);

export const adminRouter = router;
