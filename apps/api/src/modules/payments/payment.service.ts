import { PaymentQuery } from "@courtdesk/shared";
import { CreatePaymentFinalPayload, GetPaymentsResult } from "./payment.types";
import { calculateTotalPages } from "@/utils/calculateTotalPages";
import { AppError } from "@/utils/errors/AppError";

import * as paymentRepository from "./payment.repository";
import * as reservationRepository from "../reservations/reservation.repository";

export const getPayments = async (
  query: PaymentQuery,
): Promise<GetPaymentsResult> => {
  const { payments, total } = await paymentRepository.find(query);

  const { page, limit } = query;

  return {
    payments,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getPaymentById = async (paymentId: string) => {
  const payment = await paymentRepository.findWithRelationsById(paymentId);

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  return payment;
};

export const createPayment = async (payload: CreatePaymentFinalPayload) => {
  const reservation = await reservationRepository.findById(
    payload.reservationId,
  );

  if (!reservation) {
    throw new AppError(404, "Reservation not found");
  }

  const payment = await paymentRepository.add(payload);

  if (reservation.status === "pending") {
    reservationRepository.update(reservation, { status: "confirmed" });
  }

  return payment;
};
