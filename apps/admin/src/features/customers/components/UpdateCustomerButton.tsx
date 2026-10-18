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
import UpdateCustomerForm from "./UpdateCustomerForm";
import type { CustomerWithRelations } from "@courtdesk/shared";

type Props = {
  selectedCustomer: CustomerWithRelations;
};

const UpdateCustomerButton = ({ selectedCustomer }: Props) => {
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
          <DialogTitle>Update Existing Customer</DialogTitle>

          <DialogDescription>
            Update an existing customer from your records.
          </DialogDescription>
        </DialogHeader>

        <UpdateCustomerForm
          setDialogOpen={setOpen}
          selectedCustomer={selectedCustomer}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCustomerButton;
