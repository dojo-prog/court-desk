import { Card, CardContent } from "@/components/ui/card";

const CalendarLoadingState = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-muted-foreground">Loading reservations...</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-125 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    </main>
  );
};

export default CalendarLoadingState;
