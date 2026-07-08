import bcrypt from "bcryptjs";
import { RegisterUserPayload } from "./user.interface";
import config from "../config";
import { prisma } from "../lib/prisma";

const registerUserIntoDb = async (payload: RegisterUserPayload) => {
  const { name, address, email, password, phone, role, profileImage } = payload;
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isExist) {
    throw new Error("User with this email address already exist!");
  }
  if (role === "ADMIN") {
    throw new Error("You are not allowed to set this role");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      role,
      profileImage,
    },
  });
  return createdUser;
};

const getProfileFromDb = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true },
  });

  return user;
};

export const userService = {
  registerUserIntoDb,
  getProfileFromDb,
};
