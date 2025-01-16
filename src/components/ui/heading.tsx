import * as React from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
}

export function Heading({
  className,
  as: Component = 'h2',
  size = 'lg',
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(
        'font-semibold text-primary leading-tight',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}
