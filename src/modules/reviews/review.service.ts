import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReviewIntoDB = async (userId: string, payload: IReview) => {
  const { bookingId, comment, rating, technicianProfileId } = payload;

  const didThisCustomerBook = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      technicianId: technicianProfileId,
      customerId: userId,
    },
  });

  if (!didThisCustomerBook) {
    throw new Error("Not valid reviewer");
  }

  if (didThisCustomerBook.status !== "COMPLETED") {
    throw new Error("You can review only after getting service");
  }

  const isReviewExist = await prisma.review.findFirst({
    where: {
      bookingId,
    },
  });

  if (isReviewExist) {
    throw new Error("Review for this booking already exist");
  }

  const postReview = await prisma.review.create({
    data: {
      bookingId,
      comment,
      rating,
      technicianProfileId,
      customerId: userId,
    },
  });

  return postReview;
};

export const reviewService = {
  createReviewIntoDB,
};
