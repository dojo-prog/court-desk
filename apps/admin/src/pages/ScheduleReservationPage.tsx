import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  CreateReservationBodySchema,
  type CreateReservationBody,
} from "@courtdesk/shared";
import { Button } from "@/components/ui/button";

import Header from "./schedule-reservation/Header";
import { CustomerAndCourtSelection } from "./schedule-reservation/CustomerAndCourtSelection";
import { DateAndTimeSelection } from "./schedule-reservation/DateAndTimeSelection";
import { PaymentDetailsSection } from "./schedule-reservation/PaymentDetailsSection";
import { NotesSection } from "./schedule-reservation/NotesSection";
import { useCreateReservation } from "@/features/reservations/hooks/useCreateReservation";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "@/components/common/ButtonLoader";

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const ScheduleReservationPage = () => {
  const navigate = useNavigate();

  const [customerSearch, setCustomerSearch] = useState("");
  const [courtSearch, setCourtSearch] = useState("");
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCourtName, setSelectedCourtName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateReservationBodySchema),
    defaultValues: {
      customerId: "",
      courtId: "",
      date: getLocalDate(),
      startTime: "09:00",
      duration: 1,
      totalAmount: undefined,
      minimumPayment: undefined,
      status: "pending",
      notes: "",
    },
  });

  const { mutateAsync: createReservation, isPending } = useCreateReservation();

  const onSubmit = async (data: CreateReservationBody) => {
    await createReservation(data);

    navigate("/reservations");
  };

  const fieldClassName = "space-y-2";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Header />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CustomerAndCourtSelection
          fieldClassName={fieldClassName}
          errors={errors}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          selectedCustomerName={selectedCustomerName}
          setSelectedCustomerName={setSelectedCustomerName}
          selectedCourtName={selectedCourtName}
          setSelectedCourtName={setSelectedCourtName}
          customerSearch={customerSearch}
          setCustomerSearch={setCustomerSearch}
          courtSearch={courtSearch}
          setCourtSearch={setCourtSearch}
        />

        <DateAndTimeSelection
          fieldClassName={fieldClassName}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
        />

        <PaymentDetailsSection
          fieldClassName={fieldClassName}
          register={register}
          errors={errors}
        />

        <NotesSection
          fieldClassName={fieldClassName}
          register={register}
          errors={errors}
        />

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset({
                customerId: "",
                courtId: "",
                date: getLocalDate(),
                startTime: "09:00",
                duration: 1,
                totalAmount: undefined,
                minimumPayment: undefined,
                notes: "",
              });

              setCustomerSearch("");
              setCourtSearch("");
              setSelectedCustomerName("");
              setSelectedCourtName("");
            }}
          >
            Reset form
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={"text-white"}
          >
            <ButtonLoader isLoading={isPending}>
              Schedule Reservation
            </ButtonLoader>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleReservationPage;
