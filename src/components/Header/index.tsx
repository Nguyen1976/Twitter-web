import ButtonIcon from '~/components/ButtonIcon'
import { Link, useLocation } from 'react-router-dom'
import { dropDownItemMore, optionNavBar } from '~/constants/index'
import { Dropdown, DropdownItem } from 'flowbite-react'

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
        {optionNavBar.map((option) => (
          <Link to={option.pathName || '/'}>
            <ButtonIcon
              key={option.pathName}
              isActive={option.pathName === pathName}
              iconButton={option.iconButton}
              iconButtonActive={option.iconButtonActive}
              textButton={option.textButton}
            />
          </Link>
        ))}
        <Dropdown
          placement='top-start'
          label={undefined}
          dismissOnClick={false}
          renderTrigger={() => (
            <span>
              <ButtonIcon
                isActive={false}
                iconButton={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                }
                textButton={'More'}
              />
            </span>
          )}
        >
          {dropDownItemMore.map((item) => (
            <DropdownItem className='flex items-center justify-start gap-7'>
              {item.icon}
              <span className='font-bold text-xl'>{item.text}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      </nav>
    </header>
  )
}

export default Header
