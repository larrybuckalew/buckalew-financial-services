
import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check for user's preferred theme from browser/system settings
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}

export default useTheme
