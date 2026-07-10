import { Availability } from "../../../generated/prisma/client";

export interface IBooking {
  serviceId: string;
  availabilitySlotId: string;
  availability: Availability;
  technicianIdToBook: string;
  customerAddress: string;
  note: string;
  totalPrice: number;
  timeSlotId: string;
  bookingTime: string;
}
