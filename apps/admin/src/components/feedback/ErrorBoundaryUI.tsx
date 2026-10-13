import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type ErrorBoundaryUIProps = {
  error: Error | null;
  onRetry: () => void;
};

const ErrorBoundaryUI = ({ error, onRetry }: ErrorBoundaryUIProps) => {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-3xl" />

        <div className="absolute left-[15%] top-[20%] size-2 rounded-full bg-destructive/15" />
        <div className="absolute right-[18%] top-[30%] size-3 rounded-full bg-destructive/10" />
        <div className="absolute bottom-[20%] left-[25%] size-3 rounded-full bg-destructive/10" />
        <div className="absolute bottom-[25%] right-[20%] size-2 rounded-full bg-destructive/15" />
      </div>

      <Card className="w-full max-w-lg shadow-sm">
        <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12">
          {/* Error icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 scale-125 rounded-full bg-destructive/5 blur-xl" />

            <div className="relative flex size-20 items-center justify-center rounded-full border bg-background">
              <AlertTriangle className="size-9 text-destructive" />
            </div>
          </div>

          {/* Heading */}
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Unexpected error
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Something went wrong
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            We ran into an unexpected problem while displaying this page. Please
            try again, or return to the home page if the problem continues.
          </p>

          {/* Actions */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              onClick={onRetry}
              className="sm:min-w-32"
            >
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>

            <Button size="lg" className="sm:min-w-36 text-white">
              <Link to="/" className="flex items-center">
                <Home className="mr-2 size-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Secondary navigation */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 size-3.5" />
            Go back to the previous page
          </button>

          {/* Development-only error */}
          {import.meta.env.DEV && error && (
            <details className="mt-8 w-full text-left">
              <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
                Show error details
              </summary>

              <pre className="mt-3 max-h-40 overflow-auto rounded-lg border bg-muted/50 p-3 text-xs leading-5 text-muted-foreground">
                {error.stack || error.message}
              </pre>
            </details>
          )}

          {/* Branding */}
          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            <span>Dojo</span>
            <span className="h-px w-8 bg-border" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorBoundaryUI;
