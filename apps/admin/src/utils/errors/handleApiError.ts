import { toast } from "sonner";
import { ApiError } from "./ApiError";
import { env } from "@/config/env";

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  if (env.environment !== "production") {
    console.error(error);
  }

  toast.error("Something went wrong. Please try again");
};
