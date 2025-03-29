import React from 'react'

interface ButtonProps {
  text: string
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className='py-3 bg-black text-xl text-white font-bold w-full rounded-full'>{text}</button>
  )
}

export default Button
