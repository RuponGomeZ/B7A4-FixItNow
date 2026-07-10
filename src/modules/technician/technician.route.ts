import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-profile",
  auth(Role.TECHNICIAN),
  technicianController.createTechnicianProfile,
);

router.get("/", technicianController.getAllTechnician);
router.get("/:id", technicianController.getTechnicianById);
router.put(
  "/update-profile",
  auth(Role.TECHNICIAN),
  technicianController.updateTechnicianProfile,
);

export const technicianRouter = router;
