import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface InteractiveCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  onClick?: () => void
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer overflow-hidden"
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        {icon && (
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
      <motion.div
        className="h-1 bg-blue-500 mt-4"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default InteractiveCard