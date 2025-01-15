import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'bg-blue-500'
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="w-full">
      {label && <p className="text-sm mb-2 text-gray-700">{label}</p>}
      <div className="bg-gray-200 rounded-full h-2.5 w-full">
        <motion.div
          className={`${color} h-2.5 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 1, 
            type: 'tween' 
          }}
        />
      </div>
      <p className="text-sm mt-1 text-gray-600">{`${percentage.toFixed(0)}%`}</p>
    </div>
  )
}

export default ProgressBar