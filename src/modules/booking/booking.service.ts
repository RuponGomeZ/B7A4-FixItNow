import { prisma } from "../../lib/prisma";
import { IBooking } from "./booking.interface";

const createBookingIntoDb = async (payload: IBooking) => {
  const { customerId } = payload;

  const createBooking = await prisma.booking.create({
    data: payload,
  });
};

export const bookingService = {
  createBookingIntoDb,
};
