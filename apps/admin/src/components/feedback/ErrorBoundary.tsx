import React from "react";
import ErrorBoundaryUI from "./ErrorBoundaryUI";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error Boundary caught:", error);
    console.error("Component stack:", errorInfo.componentStack);

    // TODO apply Sentry & send error to Sentry
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryUI error={this.state.error} onRetry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}
