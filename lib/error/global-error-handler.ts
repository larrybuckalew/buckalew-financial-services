import { NextApiRequest, NextApiResponse } from 'next'
import { Logger } from '../utils/logging'

// Comprehensive global error handler
export function globalErrorHandler(err: any, req: NextApiRequest, res: NextApiResponse) {
  const logger = Logger.getInstance()

  // Log the error with detailed context
  logger.log('error', 'Unhandled Error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    path: req.url,
    body: req.body,
    query: req.query
  })

  // Determine appropriate response based on error type
  const statusCode = determineStatusCode(err)
  const errorResponse = formatErrorResponse(err, statusCode)

  // Send error response
  res.status(statusCode).json(errorResponse)

  // Optionally trigger additional error notification
  triggerErrorNotification(err)
}

// Determine appropriate HTTP status code
function determineStatusCode(err: any): number {
  if (err.status && typeof err.status === 'number') return err.status
  if (err.statusCode && typeof err.statusCode === 'number') return err.statusCode

  switch (err.name) {
    case 'ValidationError': return 400
    case 'UnauthorizedError': return 401
    case 'ForbiddenError': return 403
    case 'NotFoundError': return 404
    default: return 500
  }
}

// Format error response with different levels of detail
function formatErrorResponse(err: any, statusCode: number) {
  const baseResponse = {
    status: 'error',
    statusCode,
    timestamp: new Date().toISOString()
  }

  // Different error details based on environment
  if (process.env.NODE_ENV === 'development') {
    return {
      ...baseResponse,
      message: err.message,
      stack: err.stack,
      details: err.details || {}
    }
  } else {
    return {
      ...baseResponse,
      message: statusCode === 500 
        ? 'An unexpected error occurred' 
        : err.message || 'An error occurred'
    }
  }
}

// Trigger external error notification
function triggerErrorNotification(err: any) {
  // Could integrate with services like Sentry, Datadog, etc.
  if (process.env.NODE_ENV === 'production') {
    try {
      // Example: Send to monitoring service
      fetch('https://error-tracking-service.com/report', {
        method: 'POST',
        body: JSON.stringify({
          message: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error)
    } catch (notificationErr) {
      console.error('Error notification failed', notificationErr)
    }
  }
}