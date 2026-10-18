import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateCustomerBodySchema,
  type CustomerWithRelations,
  type UpdateCustomerBody,
} from "@courtdesk/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { type Dispatch, type SetStateAction } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/common/ButtonLoader";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedCustomer: CustomerWithRelations;
};

const UpdateCustomerForm = ({ setDialogOpen, selectedCustomer: sc }: Props) => {
  const { mutateAsync: updateCustomer, isPending } = useUpdateCustomer();

  if (!sc) return null;

  const form = useForm({
    resolver: zodResolver(UpdateCustomerBodySchema),

    defaultValues: {
      firstName: sc.first_name,
      lastName: sc.last_name,
      email: sc.email ?? undefined,
      phone: sc.phone ?? undefined,
    },
  });

  const onSubmit = async (data: UpdateCustomerBody) => {
    await updateCustomer({
      customerId: sc.id,
      body: data,
    });

    setDialogOpen(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>

        <Input
          id="first-name"
          placeholder="e.g. John"
          {...form.register("firstName")}
        />

        <FieldError errors={[form.formState.errors.firstName]} />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>

        <Input
          id="last-name"
          placeholder="e.g. Doe"
          {...form.register("lastName")}
        />

        <FieldError errors={[form.formState.errors.lastName]} />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          <span>Email</span> <span className="text-xs">(Optional)</span>
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="e.g. Doe"
          {...form.register("email")}
        />

        <FieldError errors={[form.formState.errors.email]} />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">
          <span>Phone Number</span> <span className="text-xs">(Optional)</span>
        </Label>

        <Input
          id="phone"
          placeholder="09*********"
          maxLength={11}
          {...form.register("phone")}
        />

        <FieldError errors={[form.formState.errors.phone]} />
      </div>

      {/* Footer */}
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending} className="px-4 text-white">
          <ButtonLoader isLoading={isPending}>Update Customer</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateCustomerForm;
