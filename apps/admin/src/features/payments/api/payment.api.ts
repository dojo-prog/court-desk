import { api } from "@/lib/axios/client";
import type { CreatePaymentBody, PaymentQuery } from "@courtdesk/shared";
import type {
  CreatePaymentRes,
  FetchPaymentRes,
  FetchPaymentsRes,
} from "../types/payment.types";

// =======================================
// Queries
// =======================================

export const fetchPayments = async (params: PaymentQuery) => {
  const { data } = await api.get<FetchPaymentsRes>(`/v1/payments`, { params });

  return data.data;
};

export const fetchPayment = async (paymentId: string) => {
  const { data } = await api.get<FetchPaymentRes>(`/v1/payments/${paymentId}`);

  return data.data;
};

// =======================================
// Mutations
// =======================================

export const createPayment = async (body: CreatePaymentBody) => {
  const { data } = await api.post<CreatePaymentRes>(`/v1/payments`, body);

  return data.data;
};
