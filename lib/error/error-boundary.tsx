import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Logger } from '../utils/logging'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private logger: Logger

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
    this.logger = Logger.getInstance()
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    this.logger.log('error', 'Unhandled React Error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })

    // Optional: Send error to external service
    this.sendErrorToService(error, errorInfo)
  }

  private sendErrorToService(error: Error, errorInfo: ErrorInfo) {
    try {
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack
        })
      })
    } catch (reportError) {
      console.error('Error reporting failed', reportError)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom error fallback UI
      return this.props.fallback || (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>We apologize for the inconvenience. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary