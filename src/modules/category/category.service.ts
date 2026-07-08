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

export const categoryService = {
  createCategoryIntoDb,
};
