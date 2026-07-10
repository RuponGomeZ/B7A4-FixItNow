import { prisma } from "../../lib/prisma";
import { ICategory } from "./admin.interface";

const getAllUsersFromDb = async () => {};

const updateUserStatusIntoDb = async () => {};

const getAllBookings = async () => {};

const createCategoryIntoDb = async (payload: ICategory) => {
  const { name, description } = payload;

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
