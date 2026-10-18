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
import type { UserPublicEntity } from "@courtdesk/shared";
import UpdateUserForm from "./UpdateUserForm";

type Props = {
  user: UserPublicEntity;
};

const UpdateUserButton = ({ user }: Props) => {
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
          <DialogTitle>Update Existing User</DialogTitle>

          <DialogDescription>
            Update an existing user from your records.
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm setDialogOpen={setOpen} user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserButton;
