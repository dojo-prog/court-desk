import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2 text-center">
          <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="size-8" />
          </div>

          <p className="text-sm font-medium text-muted-foreground">ERROR 403</p>

          <CardTitle className="text-2xl">Access Forbidden</CardTitle>

          <CardDescription className="max-w-xs">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is a mistake.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <p className="font-medium">Why am I seeing this?</p>
            <p className="mt-1 text-muted-foreground">
              Your account may not have the required role or permissions to view
              this resource.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:flex-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ForbiddenPage;
