import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchCheck } from "lucide-react";
import { useState } from "react";
import CheckAvailabilityForm from "./CheckAvailabilityForm";

const CheckAvailabilityButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant={"outline"}
            className={"text-white flex items-center"}
          >
            <SearchCheck />
            <span>Check Court Availability</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check Court Availability</DialogTitle>

          <DialogDescription>
            Provide the fields below to check availability.
          </DialogDescription>
        </DialogHeader>

        <CheckAvailabilityForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CheckAvailabilityButton;
