import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourtStatusSchema,
  CreateCourtBodySchema,
  type CourtStatus,
  type CreateCourtBody,
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
import { useCreateCourt } from "../hooks/useCreateCourt";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const RegisterCourtForm = ({ setDialogOpen }: Props) => {
  const { mutateAsync: createCourt, isPending } = useCreateCourt();

  const form = useForm({
    resolver: zodResolver(CreateCourtBodySchema),

    defaultValues: {
      name: "",
      status: "active" as CourtStatus,
    },
  });

  const onSubmit = async (data: CreateCourtBody) => {
    await createCourt(data);

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
              <SelectTrigger id="court-status">
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
          <ButtonLoader isLoading={isPending}>Register Court</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RegisterCourtForm;
