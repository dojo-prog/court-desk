import { UserPrivateEntity } from "@courtdesk/shared";

export const mockUsers: Partial<UserPrivateEntity>[] = [
  {
    first_name: "Super",
    last_name: "Admin",
    email: "admin@dojo.com",
    role: "admin",
  },
  {
    first_name: "Staff",
    last_name: "One",
    email: "staff.1@dojo.com",
    role: "staff",
  },
  {
    first_name: "Staff",
    last_name: "Two",
    email: "staff.2@dojo.com",
    role: "staff",
  },
];
