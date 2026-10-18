import {
  UpdateUserBodySchema,
  UserRoleSchema,
  type UpdateUserBody,
  type UserPublicEntity,
  type UserRole,
} from "@courtdesk/shared";
import { type Dispatch, type SetStateAction } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/common/ButtonLoader";
import { cn } from "cn";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  user: UserPublicEntity;
};

const UpdateUserForm = ({ setDialogOpen, user }: Props) => {
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const defaultValues = {
    role: user.role as UserRole,
    firstName: user.first_name,
    lastName: user.last_name,
  };

  const form = useForm({
    resolver: zodResolver(UpdateUserBodySchema),

    defaultValues,
  });

  const role = form.watch("role");
  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");

  const onSubmit = async (data: UpdateUserBody) => {
    await updateUser({ userId: user.id, body: data });

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
              <SelectTrigger
                id="user-role"
                className={cn(
                  role !== defaultValues.role && "border-2 border-primary",
                )}
              >
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
            className={cn(
              firstName !== defaultValues.firstName &&
                "border-2 border-primary",
            )}
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
            className={cn(
              lastName !== defaultValues.lastName && "border-2 border-primary",
            )}
            {...form.register("lastName")}
          />

          <FieldError errors={[form.formState.errors.lastName]} />
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
          <ButtonLoader isLoading={isPending}>Update User</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateUserForm;
