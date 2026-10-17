import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Users } from "lucide-react";

type Props = {
  title: string;
  value: string;
  description: string;
  icon: typeof Users;
};

export const StatCard = ({ title, value, description, icon: Icon }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
