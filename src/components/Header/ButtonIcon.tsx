import React from 'react'

interface ButtonIconProps {
  isActive: boolean
  iconButton: React.ReactElement
  iconButtonActive?: React.ReactElement
  textButton?: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ isActive, iconButton, iconButtonActive, textButton }) => {
  return (
    <div
      className={`${isActive ? '' : 'hover:bg-zinc-200'} inline-flex py-2 pl-2 pr-2 xl:pr-5 justify-start items-center gap-4 rounded-full w-fit transition-all duration-300 dark:text-white dark:hover:bg-zinc-800`}
    >
      {isActive ? iconButtonActive : iconButton}
      <div className={`text-xl ${isActive ? 'font-semibold' : ''} cursor-pointer xl:block hidden dark:text-white`}>{textButton}</div>
    </div>
  )
}

export default ButtonIcon
