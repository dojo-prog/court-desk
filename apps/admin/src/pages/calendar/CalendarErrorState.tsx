import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX2 } from "lucide-react";

const CalendarErrorState = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-4 p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>

      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <CalendarX2 className="h-8 w-8 text-muted-foreground" />
          <h2 className="font-semibold">Unable to load reservations</h2>
          <p className="text-sm text-muted-foreground">
            Something went wrong while retrieving calendar data. Please try
            again.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default CalendarErrorState;
