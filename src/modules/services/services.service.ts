import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IService, IServiceQuery } from "./services.interface";

const createServiceInToDB = async (payload: IService) => {
  const {
    categoryId,
    serviceTitle,
    description,
    price,
    duration,
    technicianId,
    location,
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
  if (!location) {
    throw new Error("Location required");
  }

  const createService = await prisma.service.create({
    data: {
      technicianProfileId: technicianId,
      categoryId,
      title: serviceTitle,
      description,
      price,
      duration,
      location,
    },
  });
  return createService;
};

const getAllServicesFromDb = async (query: IServiceQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: ServiceWhereInput[] = [];

  if (query.price) {
    andConditions.push({
      price: Number(query.price),
    });
  }

  if (query.maxPrice) {
    andConditions.push({
      price: { lte: Number(query.maxPrice) },
    });
  }

  if (query.category) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }

  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }

  if (query.type) {
    andConditions.push({
      title: query.type,
    });
  }

  const result = await prisma.service.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return result;
};
export const servicesService = {
  getAllServicesFromDb,
  createServiceInToDB,
};
