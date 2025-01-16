// Accessibility utility functions
export const generateA11yAttributes = {
  // Generate aria labels and roles dynamically
  button: (label: string, description?: string) => ({
    'aria-label': label,
    'aria-describedby': description ? `${label}-description` : undefined,
    role: 'button'
  }),

  // Create input field accessibility attributes
  input: (label: string, error?: string) => ({
    'aria-label': label,
    'aria-invalid': !!error,
    'aria-errormessage': error ? `${label}-error` : undefined
  }),

  // Generate semantic navigation attributes
  navigation: (label: string) => ({
    'aria-label': label,
    role: 'navigation'
  })
}

// Color contrast checker
export const checkColorContrast = (foreground: string, background: string): number => {
  const getLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >>  8) & 0xff
    const b = (rgb >>  0) & 0xff

    const [R, G, B] = [r, g, b].map(c => {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }

  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)

  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  return Number(contrast.toFixed(1))
}

// Screen reader friendly date formatting
export const formatAccessibleDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }).format(date)
}

// Keyboard navigation utility
export const createKeyboardNavigation = ({
  onEnter,
  onEscape,
  onArrowDown,
  onArrowUp
}: {
  onEnter?: () => void
  onEscape?: () => void
  onArrowDown?: () => void
  onArrowUp?: () => void
}) => {
  return (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        onEnter?.()
        break
      case 'Escape':
        onEscape?.()
        break
      case 'ArrowDown':
        onArrowDown?.()
        break
      case 'ArrowUp':
        onArrowUp?.()
        break
    }
  }
}