import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { IPaymentPayload } from "./payment.interface";

const createCheckOutSessionIntoDB = async (
  userId: string,
  payload: IPaymentPayload,
) => {
  const { bookingId } = payload;

  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        payments: true,
      },
    });

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
    }

    const bookingDetails = await tx.booking.findUniqueOrThrow({
      where: {
        id: bookingId,
      },
    });

    const serviceDetails = await tx.service.findUniqueOrThrow({
      where: {
        id: bookingId,
      },
    });

    const price = Math.round(Number(bookingDetails.totalPrice) * 100);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceDetails.title,
            },
            unit_amount: price,
          },
        },
      ],
      customer: stripeCustomerId,
      success_url: `${config.app_url}/premium?success=true`,
      cancel_url: `${config.app_url}/premium?success=false`,
      metadata: { userId: user.id },
    });

    return session.url;
  });
  return {
    paymentUrl: transactionResult,
  };
};

const handleWebhook = async () => {};

export const paymentService = {
  createCheckOutSessionIntoDB,
  handleWebhook,
};
