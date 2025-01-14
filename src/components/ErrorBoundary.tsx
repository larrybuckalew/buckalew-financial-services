import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppLogger } from '@/lib/logging/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    AppLogger.error('Unhandled Error', {
      error,
      errorInfo: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-50 p-8 text-center">
          <h2 className="text-2xl text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-red-500">
            Please refresh the page or contact support
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;