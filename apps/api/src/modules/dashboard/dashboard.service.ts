import { DashboardOverview } from "@courtdesk/shared";

import * as userRepository from "@/modules/users/user.repository";
import * as customerRepository from "@/modules/customers/customer.repository";
import * as reservationRepository from "@/modules/reservations/reservation.repository";
import * as paymentRepository from "@/modules/payments/payment.repository";

export const getOverview = async (): Promise<DashboardOverview> => {
  const [users, customers, reservations, revenue, reservations_today] =
    await Promise.all([
      userRepository.count(),
      customerRepository.count(),
      reservationRepository.count(),
      paymentRepository.countRevenue(),
      reservationRepository.find({
        page: 1,
        limit: 100,
        date: new Date().toISOString().split("T")[0],
      }),
    ]);

  const { reservations: rs } = reservations_today;

  return {
    stats: {
      users,
      customers,
      reservations,
      revenue,
    },
    reservations_today: rs,
  };
};
