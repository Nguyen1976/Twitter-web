import ButtonIcon from '~/components/ButtonIcon'
import { useLocation } from 'react-router-dom'
import { optionNavBar } from '~/constants/index'

const Header = () => {
  const location = useLocation()
  const pathName = location.pathname

  return (
    <header className='overflow-y-auto'>
      <div className='h-header py-2 flex justify-start items-center'>
        <div className='p-2 rounded-full hover:bg-zinc-300'>
          <img className='h-logo' src='src/assets/twitter.png' alt='' />
        </div>
      </div>

      <nav className='flex flex-col gap-3'>
        {optionNavBar.map((option, index) => (
          <ButtonIcon
            key={index}
            isActive={option.pathName === pathName}
            iconButton={option.iconButton}
            iconButtonActive={option.iconButtonActive}
            textButton={option.textButton}
            pathName={option.pathName}
          />
        ))}
      </nav>
    </header>
  )
}

export default Header
