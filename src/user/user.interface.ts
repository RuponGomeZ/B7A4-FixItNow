import { Prisma } from "../../generated/prisma/client";

type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  profileImage?: string;
  role: Role;
}
