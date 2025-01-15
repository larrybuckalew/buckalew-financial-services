import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary'
}) => {
  const [isHovering, setIsHovering] = useState(false)

  const variants = {
    primary: {
      backgroundColor: '#2563eb',
      color: 'white',
      scale: 1,
      transition: { duration: 0.2 }
    },
    secondary: {
      backgroundColor: '#10b981',
      color: 'white',
      scale: 1,
      transition: { duration: 0.2 }
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#2563eb',
      borderColor: '#2563eb',
      scale: 1,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.button
      className={`px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onClick={onClick}
      animate={variants[variant]}
    >
      {children}
    </motion.button>
  )
}

export default AnimatedButton