import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Notification {
  id: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export function useNotifications() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async () => {
    if (!session) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }
      const data = await response.json()
      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const markNotificationsAsRead = async (notificationIds: string[]) => {
    if (!session) return

    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds })
      })

      if (!response.ok) {
        throw new Error('Failed to mark notifications as read')
      }

      // Remove read notifications or update their status
      setNotifications(prev => 
        prev.filter(notification => !notificationIds.includes(notification.id))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Optional: Set up polling or WebSocket for real-time updates
    const intervalId = setInterval(fetchNotifications, 60000) // Fetch every minute

    return () => clearInterval(intervalId)
  }, [session])

  return {
    notifications,
    isLoading,
    error,
    fetchNotifications,
    markNotificationsAsRead
  }
}