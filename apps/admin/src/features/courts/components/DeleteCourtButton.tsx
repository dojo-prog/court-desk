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
import type { CourtEntity } from "@courtdesk/shared";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDeleteCourt } from "../hooks/useDeleteCourt";

type Props = {
  court: CourtEntity;
};

const DeleteCourtButton = ({ court }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutateAsync: deleteCourt, isPending } = useDeleteCourt();

  const handleDeleteCourt = async () => {
    await deleteCourt(court.id);

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
          <AlertDialogTitle>{`Remove court (${court.name})?`}</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the court
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={handleDeleteCourt}
          >
            <ButtonLoader isLoading={isPending}>Delete Court</ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCourtButton;
