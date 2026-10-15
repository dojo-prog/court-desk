import { ReservationEntity } from "@courtdesk/shared";
import { mockCustomers } from "../customers/data.ts";

const customer = (index: number) => ({
  customerFName: mockCustomers[index].first_name!,
  customerLName: mockCustomers[index].last_name!,
});

const today = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Manila",
});

const todayReservation = (
  customerIndex: number,
  startHour: number,
  durationHours: number,
  totalAmount: number,
  minimumPayment: number,
  status: ReservationEntity["status"],
  notes: string | null = null,
) => ({
  ...customer(customerIndex),
  date: today,
  start_time: `${String(startHour).padStart(2, "0")}:00`,
  end_time: `${String(startHour + durationHours).padStart(2, "0")}:00`,
  total_amount: totalAmount,
  minimum_payment: minimumPayment,
  status,
  notes,
});

export const mockReservations: Partial<
  ReservationEntity & { customerFName: string; customerLName: string }
>[] = [
  // Dynamic Today's reservations (10)
  todayReservation(0, 8, 1, 300, 100, "confirmed"),
  todayReservation(1, 9, 2, 600, 200, "confirmed"),
  todayReservation(2, 11, 1, 300, 100, "pending"),
  todayReservation(3, 12, 2, 600, 300, "confirmed", "Group of four players"),
  todayReservation(4, 14, 1, 300, 100, "completed"),
  todayReservation(5, 15, 1, 300, 100, "confirmed"),
  todayReservation(6, 16, 1, 300, 100, "pending", "Will pay upon arrival"),
  todayReservation(7, 17, 1, 350, 150, "confirmed"),
  todayReservation(
    8,
    18,
    1,
    350,
    150,
    "cancelled",
    "Cancelled due to schedule conflict",
  ),
  todayReservation(9, 19, 2, 700, 350, "confirmed", "Evening reservation"),

  // October 14, 2026 (4)
  {
    ...customer(10),
    date: "2026-10-14",
    start_time: "08:00",
    end_time: "09:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "completed",
    notes: null,
  },
  {
    ...customer(11),
    date: "2026-10-14",
    start_time: "09:00",
    end_time: "11:00",
    total_amount: 600,
    minimum_payment: 200,
    status: "completed",
    notes: "Regular customer",
  },
  {
    ...customer(12),
    date: "2026-10-14",
    start_time: "11:00",
    end_time: "12:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "completed",
    notes: null,
  },
  {
    ...customer(13),
    date: "2026-10-14",
    start_time: "12:00",
    end_time: "14:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "cancelled",
    notes: "Customer requested cancellation",
  },

  // October 13, 2026 (3)
  {
    ...customer(14),
    date: "2026-10-13",
    start_time: "09:00",
    end_time: "10:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "completed",
    notes: null,
  },
  {
    ...customer(15),
    date: "2026-10-13",
    start_time: "10:00",
    end_time: "12:00",
    total_amount: 600,
    minimum_payment: 200,
    status: "completed",
    notes: "Birthday game",
  },
  {
    ...customer(16),
    date: "2026-10-13",
    start_time: "12:00",
    end_time: "13:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "completed",
    notes: null,
  },

  // October 12, 2026 (2)
  {
    ...customer(17),
    date: "2026-10-12",
    start_time: "08:00",
    end_time: "10:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "completed",
    notes: null,
  },
  {
    ...customer(18),
    date: "2026-10-12",
    start_time: "10:00",
    end_time: "11:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "completed",
    notes: "Walk-in booking",
  },

  // October 11, 2026 (1)
  {
    ...customer(19),
    date: "2026-10-11",
    start_time: "16:00",
    end_time: "18:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "completed",
    notes: null,
  },

  // October 16, 2026 (2)
  {
    ...customer(0),
    date: "2026-10-16",
    start_time: "09:00",
    end_time: "10:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "confirmed",
    notes: null,
  },
  {
    ...customer(1),
    date: "2026-10-16",
    start_time: "10:00",
    end_time: "12:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "pending",
    notes: "Awaiting down payment",
  },

  // October 17, 2026 (2)
  {
    ...customer(2),
    date: "2026-10-17",
    start_time: "08:00",
    end_time: "10:00",
    total_amount: 600,
    minimum_payment: 200,
    status: "confirmed",
    notes: null,
  },
  {
    ...customer(3),
    date: "2026-10-17",
    start_time: "10:00",
    end_time: "11:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "pending",
    notes: null,
  },

  // October 18, 2026 (2)
  {
    ...customer(4),
    date: "2026-10-18",
    start_time: "10:00",
    end_time: "12:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "confirmed",
    notes: "Weekend booking",
  },
  {
    ...customer(5),
    date: "2026-10-18",
    start_time: "12:00",
    end_time: "13:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "pending",
    notes: null,
  },

  // October 19, 2026 (1)
  {
    ...customer(6),
    date: "2026-10-19",
    start_time: "09:00",
    end_time: "11:00",
    total_amount: 600,
    minimum_payment: 300,
    status: "confirmed",
    notes: null,
  },

  // October 20, 2026 (1)
  {
    ...customer(7),
    date: "2026-10-20",
    start_time: "13:00",
    end_time: "14:00",
    total_amount: 300,
    minimum_payment: 100,
    status: "pending",
    notes: "First-time customer",
  },

  // October 21, 2026 (1)
  {
    ...customer(8),
    date: "2026-10-21",
    start_time: "16:00",
    end_time: "18:00",
    total_amount: 600,
    minimum_payment: 200,
    status: "confirmed",
    notes: null,
  },

  // October 22, 2026 (1)
  {
    ...customer(9),
    date: "2026-10-22",
    start_time: "18:00",
    end_time: "20:00",
    total_amount: 700,
    minimum_payment: 350,
    status: "pending",
    notes: "Evening booking",
  },
];
