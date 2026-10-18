import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import RegisterCustomerForm from "./RegisterCustomerForm";

const RegisterCustomerButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className={"text-white flex items-center"}>
            <Plus />
            <span>Register Customer</span>
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register New Customer</DialogTitle>

          <DialogDescription>
            Register a new customer to your records.
          </DialogDescription>
        </DialogHeader>

        <RegisterCustomerForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterCustomerButton;
