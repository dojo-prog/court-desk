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
import type { UserPublicEntity } from "@courtdesk/shared";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { capitalize } from "@/utils/capitalize";

type Props = {
  user: UserPublicEntity;
};

const DeleteUserButton = ({ user }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDeleteUser = async () => {
    await deleteUser(user.id);

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
          <AlertDialogTitle>{`Remove ${capitalize(user.role)} (${user.first_name} ${user.last_name})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={handleDeleteUser}>
            <ButtonLoader isLoading={isPending}>Delete User</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
