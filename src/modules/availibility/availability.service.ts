import { prisma } from "../../lib/prisma";
import { IAvailability } from "./availability.interface";

const createAvailabilityIntoDb = async (
  payload: IAvailability,
  userId: string,
) => {
  const { date, endTime, isBooked, startTime } = payload;
  const getTechnicianProfile = await prisma.technicianProfile.findUniqueOrThrow(
    {
      where: {
        userId,
      },
    },
  );
  const createAvailability = await prisma.availability.create({
    data: {
      technicianProfileId: getTechnicianProfile.id,
      date,
      endTime,
      isBooked,
      startTime,
    },
  });

  return createAvailability;
};

const updateAvailabilityIntoDb = async (payload: IAvailability, id: string) => {
  const { date, endTime, isBooked, startTime } = payload;
  const updateAvailability = await prisma.availability.update({
    where: {
      id,
    },
    data: {
      date,
      endTime,
      isBooked,
      startTime,
    },
  });

  return updateAvailability;
};

export const availabilityService = {
  createAvailabilityIntoDb,
  updateAvailabilityIntoDb,
};
