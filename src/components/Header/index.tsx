import ButtonIcon from './ButtonIcon'
import { Link, useLocation } from 'react-router-dom'
import { dropDownItemMore, optionNavBar } from '~/constants/index'
import { Avatar, Dropdown, DropdownItem } from 'flowbite-react'
import Button from '~/components/Button'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const location = useLocation()
  const pathName = location.pathname

  return (
    <header className='fixed top-0 bottom-0 overflow-y-auto custom-scrollbar flex flex-col justify-between mb-7'>
      <div className='h-header py-2 flex justify-start items-center'>
        <div className='p-2 rounded-full hover:bg-zinc-300'>
          <img className='h-logo' src='src/assets/twitter.png' alt='' />
        </div>
      </div>

      <nav className='flex flex-col gap-3'>
        {optionNavBar.map((option) => (
          <Link to={option.pathName || '/'} key={option.textButton}>
            <ButtonIcon
              isActive={option.pathName === pathName}
              iconButton={option.iconButton}
              iconButtonActive={option.iconButtonActive}
              textButton={option.textButton}
            />
          </Link>
        ))}
        <Dropdown
          className='w-max !fixed z-1'
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
            <DropdownItem className='flex items-center justify-start gap-7 z-50' key={item.text}>
              {item.icon}
              <span className='font-bold text-xl'>{item.text}</span>
            </DropdownItem>
          ))}
        </Dropdown>
      </nav>
      <div className='mt-2'>
        <Button text={'Post'} />
      </div>

      {/* User */}
      <div className='rounded-full flex gap-5 items-center justify-center mt-4'>
        {/* <Avatar img='/src/assets/twitter.png' alt='avatar of Jese' rounded /> */}
        <Avatar rounded />
        <div className='flex flex-col items-center justify-center'>
          <p className='font-bold'>Nguyen Nguyen</p>
          <p className='text-sm text-zinc-500'>@shouta9271</p>
        </div>
        <AdjustmentsHorizontalIcon className='h-6 w-6 text-black' />
      </div>
    </header>
  )
}

export default Header
