import React from 'react'

interface ButtonProps {
  text: string
  large?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({ text, large = false, className }) => {
  return (
    <button
      className={`bg-black text-white font-bold rounded-full dark:text-black dark:bg-white ${large ? ' w-full py-3 text-xl' : 'py-2 px-5'} ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
