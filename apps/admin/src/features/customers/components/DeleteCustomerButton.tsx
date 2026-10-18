import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ButtonLoader from "@/components/common/ButtonLoader";
import type { CustomerWithRelations } from "@courtdesk/shared";
import { useState } from "react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  customer: CustomerWithRelations;
};

const DeleteCustomerButton = ({ customer }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutateAsync: deleteCustomer, isPending } = useDeleteCustomer();

  const handleDeleteCustomer = async () => {
    await deleteCustomer(customer.id);

    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant={"destructive"}>
            <TrashIcon />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Remove customer (${customer.first_name} ${customer.last_name})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            customer from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteCustomer}
          >
            <ButtonLoader isLoading={isPending}>Delete Customer</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerButton;
