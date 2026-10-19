import type { UseFormRegister, FieldErrors } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  fieldClassName: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const NotesSection = ({
  fieldClassName,
  register,
  errors,
}: NotesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional details</CardTitle>
        <CardDescription>
          Add any optional notes for this reservation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={fieldClassName}>
          <Label htmlFor="notes">Notes (optional)</Label>

          <Textarea
            id="notes"
            placeholder="Add any relevant reservation notes..."
            rows={4}
            {...register("notes")}
            aria-invalid={Boolean(errors.notes)}
          />

          {errors.notes && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.notes.message)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
