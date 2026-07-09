import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

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

const getAllCategory = async () => {
  const allCategory = await prisma.category.findMany();

  return allCategory;
};

export const categoryService = {
  createCategoryIntoDb,
  getAllCategory,
};
