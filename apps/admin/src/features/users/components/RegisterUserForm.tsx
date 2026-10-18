import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserBodySchema,
  UserRoleSchema,
  type RegisterUserBody,
  type UserRole,
} from "@courtdesk/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import type { Dispatch, SetStateAction } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/common/ButtonLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { capitalize } from "@/utils/capitalize";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const RegisterUserForm = ({ setDialogOpen }: Props) => {
  const { mutateAsync: createCustomer, isPending } = useRegisterUser();

  const form = useForm({
    resolver: zodResolver(RegisterUserBodySchema),

    defaultValues: {
      role: "staff" as UserRole,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedRole = form.watch("role");

  const onSubmit = async (data: RegisterUserBody) => {
    await createCustomer(data);

    setDialogOpen(false);
  };

  const userRoles = UserRoleSchema.options;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="user-role">Role</Label>

        <Controller
          name="role"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="user-role">
                <SelectValue
                  placeholder="Select a role"
                  className={"capitalize"}
                />
              </SelectTrigger>

              <SelectContent className={"w-max"}>
                {userRoles.map((sc) => (
                  <SelectItem key={sc} value={sc} className={"capitalize"}>
                    {sc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex space-x-4">
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
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="e.g. Doe"
          {...form.register("email")}
        />

        <FieldError errors={[form.formState.errors.email]} />
      </div>

      <div className="flex space-x-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="Password"
            placeholder="********"
            maxLength={11}
            {...form.register("password")}
          />

          <FieldError errors={[form.formState.errors.password]} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmation Password</Label>

          <Input
            id="confirm-password"
            type="password"
            placeholder="********"
            maxLength={11}
            {...form.register("confirmPassword")}
          />

          <FieldError errors={[form.formState.errors.confirmPassword]} />
        </div>
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
          <ButtonLoader isLoading={isPending}>
            Register {capitalize(selectedRole)}
          </ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RegisterUserForm;
