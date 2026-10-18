import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCourtStatusClassName } from "@/utils/variants/status/getCourtStatusClassName";
import type { CourtEntity } from "@courtdesk/shared";
import { TrashIcon } from "lucide-react";
import UpdateCourtButton from "./UpdateCourtButton";

type Props = {
  court: CourtEntity;
};

const CourtCard = ({ court }: Props) => {
  return (
    <Card className="group relative flex-row gap-4 rounded-xl p-4 shadow-sm transition-all hover:shadow-md sm:gap-5 sm:p-5 hover:scale-102  duration-150">
      {/* Court image placeholder */}
      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted/40 sm:h-36 sm:w-36">
        <span className="text-xs text-muted-foreground">No image</span>
      </div>

      {/* Court information */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 py-1">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getCourtStatusClassName(court.status)}`}
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />
            {court.status}
          </Badge>

          <h2 className="wrap-break-word text-base font-semibold tracking-tight sm:text-lg">
            {court.name}
          </h2>
        </div>

        <div className="space-y-1 border-t pt-3">
          <p className="text-xs text-muted-foreground">Created</p>

          <p className="text-sm font-medium">
            {new Date(court.created_at).toLocaleDateString("en-PH", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden group-hover:flex absolute top-4 right-4  items-center space-x-2">
        <UpdateCourtButton court={court} />
        <Button variant={"destructive"}>
          <TrashIcon />
        </Button>
      </div>
    </Card>
  );
};

export default CourtCard;
