import React from 'react'

// Skip navigation link for keyboard users
export const SkipNavigation: React.FC = () => {
  const handleSkip = () => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
    }
  }

  return (
    <a 
      href="#main-content"
      onClick={handleSkip}
      className="
        fixed top-[-100px] left-0 z-50 
        bg-blue-500 text-white p-2 
        transition-all duration-300 
        focus:top-0 focus:outline-none
      "
    >
      Skip to main content
    </a>
  )
}