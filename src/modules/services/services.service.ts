import { prisma } from "../../lib/prisma";
import { IService } from "./services.interface";

const createServiceInToDB = async (payload: IService) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId,
  } = payload;

  if (!technicianId) {
    throw new Error("Technician Id required");
  }
  if (!categoryId) {
    throw new Error("category Id required");
  }
  if (!description) {
    throw new Error("description  required");
  }
  if (!price && price >= 1) {
    throw new Error("price can not be less than 1");
  }
  if (!duration) {
    throw new Error("Duration required");
  }
  if (!serviceTitle) {
    throw new Error("Service Title  required");
  }

  const createService = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration,
    },
  });
  return createService;
};

const getAllServicesFromDb = async () => {
  const result = await prisma.service.findMany();

  return result;
};
export const servicesService = {
  getAllServicesFromDb,
  createServiceInToDB,
};
