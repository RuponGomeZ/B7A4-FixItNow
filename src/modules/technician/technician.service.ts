import { TechnicianProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ITechnician, ITechnicianQuery } from "./technician.interface";

const createTechnicianProfileIntoDb = async (
  payload: ITechnician,
  userId: string,
) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const isUserExist = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const isTechnicianProfileExist = await prisma.technicianProfile.findUnique({
      where: {
        userId,
      },
    });

    if (isTechnicianProfileExist) {
      throw new Error("Technician profile already exist");
    }

    const { location, name, id } = isUserExist;
    const { bio, experience, hourlyRate, service } = payload;

    if (!service) {
      throw new Error("Please insert a service to create profile");
    }

    const createProfile = await tx.technicianProfile.create({
      data: {
        userId: id,
        bio,
        experience,
        hourlyRate,
        location,
      },
    });

    return createProfile;
  });

  return transactionResult;
};

const getAllTechnicianFromDb = async (query: ITechnicianQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: TechnicianProfileWhereInput[] = [];

  if (query.minAverageRating) {
    andConditions.push({
      averageRating: { gte: Number(query.minAverageRating) },
    });
  }

  if (query.hourlyRate) {
    andConditions.push({
      hourlyRate: Number(query.hourlyRate),
    });
  }

  if (query.isAvailable !== undefined) {
    const isAvailableParse = String(query.isAvailable).toLowerCase() === "true";
    andConditions.push({
      isAvailable: isAvailableParse,
    });
  }

  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }

  if (query.minCompletedJobs) {
    andConditions.push({
      completedJobs: { gte: Number(query.minCompletedJobs) },
    });
  }

  const result = await prisma.technicianProfile.findMany({
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

const getTechnicianByIdFromDb = async (technicianId: string) => {
  const result = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId,
    },
    include: {
      reviews: true,
    },
  });

  if (!result) {
    throw new Error("Technician Profile not found!");
  }

  return result;
};

const updateTechnicianProfileIntoDb = async (
  payload: ITechnician,
  id: string,
) => {
  // const technicianProfile= await prisma.technicianProfile.findUniqueOrThrow({
  //   where:{
  //     userId:id
  //   }
  // })

  const { bio, location, experience, hourlyRate } = payload;
  const updatedProfile = await prisma.technicianProfile.update({
    where: {
      userId: id,
    },
    data: {
      userId: id,
      bio,
      experience,
      hourlyRate,
      location,
    },
  });

  return updatedProfile;
};

export const technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb,
  getTechnicianByIdFromDb,
  updateTechnicianProfileIntoDb,
};
