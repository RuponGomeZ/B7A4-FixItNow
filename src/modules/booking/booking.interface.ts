import { Availability } from "../../../generated/prisma/client";

export interface IBooking {
  serviceId: string;
  availabilitySlotId: string;
  availability: Availability;
  technicianIdToBook: string;
  customerAddress: string;
  note: string;
  timeSlotId: string;
  bookingTime: string;
}
