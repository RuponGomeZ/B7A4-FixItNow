import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export const handleCheckOutCompleted = async (
  session: Stripe.Checkout.Session,
) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const transactionId = session.payment_intent as string;
  const bookingId = session.metadata?.bookingId;

  if (!userId || !stripeCustomerId || !transactionId || !bookingId) {
    console.log("Webhook: Missing values for creating checkout session");
    return;
  }

  const stripeTransaction = await stripe.paymentIntents.retrieve(
    transactionId as string,
  );

  if (stripeTransaction.amount == null) return;
  const amount = new Prisma.Decimal(stripeTransaction.amount / 100);

  await prisma.payment.upsert({
    where: {
      transactionId,
    },
    create: {
      customerId: userId,
      stripeCustomerId,
      transactionId,
      status: "COMPLETED",
      amount,
      bookingId,
    },
    update: {
      stripeCustomerId,
      status: "COMPLETED",
      amount,
    },
  });
};
