import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourtStatusSchema,
  CreateCourtBodySchema,
  type CourtEntity,
  type CourtStatus,
  type UpdateCourtBody,
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
import { useUpdateCourt } from "../hooks/useUpdateCourt";
import { cn } from "cn";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  court: CourtEntity;
};

const UpdateCourtForm = ({ setDialogOpen, court }: Props) => {
  const { mutateAsync: updateCourt, isPending } = useUpdateCourt();

  const defaultValues = {
    name: court.name,
    status: court.status as CourtStatus,
  };

  const form = useForm({
    resolver: zodResolver(CreateCourtBodySchema),

    defaultValues,
  });

  const name = form.watch("name");
  const status = form.watch("status");

  const onSubmit = async (data: UpdateCourtBody) => {
    await updateCourt({ courtId: court.id, body: data });

    setDialogOpen(false);
  };

  const courtStatuses = CourtStatusSchema.options;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="court-status">Status</Label>

        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="court-status"
                className={cn(
                  status !== defaultValues.status && "border-2 border-primary",
                )}
              >
                <SelectValue
                  placeholder="Select a role"
                  className={"capitalize"}
                />
              </SelectTrigger>

              <SelectContent className={"w-max"}>
                {courtStatuses.map((sc) => (
                  <SelectItem key={sc} value={sc} className={"capitalize"}>
                    {sc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="court-name">Court Name</Label>

        <Input
          id="court-name"
          placeholder="e.g. Court 1"
          className={cn(
            name !== defaultValues.name && "border-2 border-primary",
          )}
          {...form.register("name")}
        />

        <FieldError errors={[form.formState.errors.name]} />
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
          <ButtonLoader isLoading={isPending}>Update Court</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateCourtForm;
