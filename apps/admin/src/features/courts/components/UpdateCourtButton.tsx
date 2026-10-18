import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import type { CourtEntity } from "@courtdesk/shared";
import UpdateCourtForm from "./UpdateCourtForm";

type Props = {
  court: CourtEntity;
};

const UpdateCourtButton = ({ court }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant={"ghost"}>
            <PenIcon />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Existing Court</DialogTitle>

          <DialogDescription>
            Update an existing court from your records.
          </DialogDescription>
        </DialogHeader>

        <UpdateCourtForm setDialogOpen={setOpen} court={court} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCourtButton;
