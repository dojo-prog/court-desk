import type { CourtEntity } from "@courtdesk/shared";
import { Card } from "@/components/ui/card";
import CourtCard from "@/features/courts/components/CourtCard";

type Props = {
  courts: CourtEntity[];
  isPending: boolean;
  isError: boolean;
};

const CourtList = ({ courts, isPending, isError }: Props) => {
  // Loading state
  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card
            key={index}
            className="flex-row gap-4 rounded-xl p-4 shadow-sm sm:gap-5 sm:p-5"
          >
            {/* Image skeleton */}
            <div className="h-28 w-28 shrink-0 animate-pulse rounded-lg bg-muted sm:h-36 sm:w-36" />

            {/* Information skeleton */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 py-1">
              <div className="space-y-3">
                <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center">
        <h3 className="font-semibold">Unable to load courts</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching courts. Please try again.
        </p>
      </div>
    );
  }

  // Empty state
  if (courts.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center">
        <h3 className="font-semibold">No courts found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Courts will appear here when they are available.
        </p>
      </div>
    );
  }

  // Courts list
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4">
      {courts.map((court) => (
        <CourtCard key={court.id} court={court} />
      ))}
    </div>
  );
};

export default CourtList;
