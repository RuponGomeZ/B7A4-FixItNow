import { prisma } from "../../lib/prisma";
import { IAvailability } from "./availability.interface";

const createAvailabilityIntoDb = async (
  payload: IAvailability,
  technicianId: string,
) => {
  const { date, endTime, isBooked, startTime } = payload;
  const createAvailability = await prisma.availability.create({
    data: {
      technicianProfileId: technicianId,
      date,
      endTime,
      isBooked,
      startTime,
    },
    include: {
      booking: true,
    },
  });

  return createAvailability;
};

export const availabilityService = {
  createAvailabilityIntoDb,
};
