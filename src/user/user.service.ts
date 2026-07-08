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

export const userService = {
  registerUserIntoDb,
};
