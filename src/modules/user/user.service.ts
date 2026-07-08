import bcrypt from "bcryptjs";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const registerUserIntoDb = async (payload: RegisterUserPayload) => {
  const { name, location, email, password, phone, role, profileImage } =
    payload;
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isExist) {
    throw new Error("User with this email location already exist!");
  }
  if (role === "ADMIN") {
    throw new Error("You are not allowed to set this role");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  let user;

  if (role === "CUSTOMER") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role,
        profileImage,
      },
    });
  }

  if (role === "TECHNICIAN") {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        phone,
        role,
        profileImage,
      },
    });
  }
  return user;
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
