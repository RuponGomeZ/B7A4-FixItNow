import { prisma } from "../../lib/prisma";

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

const getAllTechnicianFromDb = async () => {
  const result = await prisma.technicianProfile.findMany();
  return result;
};

export const technicianService = {
  createTechnicianProfileIntoDb,
  getAllTechnicianFromDb,
};
