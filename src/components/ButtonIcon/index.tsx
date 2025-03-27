import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonIconProps {
  isActive: boolean
  iconButton: React.ReactElement
  iconButtonActive: React.ReactElement
  textButton: string
  pathName: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ isActive, iconButton, iconButtonActive, textButton, pathName }) => {
  return (
    <Link to={pathName}>
      <div className='hover:bg-zinc-300 inline-flex py-2 pl-2 pr-5 justify-start items-center gap-4 rounded-full w-fit'>
        {isActive ? iconButtonActive : iconButton}
        <div className={`text-xl ${isActive ? 'font-semibold' : ''}`}>{textButton}</div>
      </div>
    </Link>
  )
}

export default ButtonIcon
