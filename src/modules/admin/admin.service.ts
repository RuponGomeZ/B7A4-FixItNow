import { prisma } from "../../lib/prisma";
import { ICategory, IStatus } from "./admin.interface";

const getAllUsersFromDb = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const updateUserStatusIntoDb = async (payload: IStatus, userId: string) => {
  const { status } = payload;
  const updateStatus = status.toUpperCase();

  if (updateStatus !== "ACTIVE" && updateStatus !== "BANNED") {
    throw new Error("You can only chance status to active or banned");
  }
  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { status: updateStatus },
  });

  return updateUser;
};

const getAllBookings = async () => {
  const allBookings = await prisma.booking.findMany();
  return allBookings;
};

const createCategoryIntoDb = async (payload: ICategory) => {
  const { name, description } = payload;
  if (!name && !description) {
    throw new Error("Required field can not be empty");
  }

  const createCategory = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return createCategory;
};

const getAllCategoriesFromDb = async () => {
  const allCategory = await prisma.category.findMany();

  return allCategory;
};

export const adminService = {
  getAllUsersFromDb,
  updateUserStatusIntoDb,
  getAllBookings,
  createCategoryIntoDb,
  getAllCategoriesFromDb,
};
