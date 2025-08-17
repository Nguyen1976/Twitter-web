import { Link, useLocation } from 'react-router-dom'
import { dropDownItemMore, optionNavBar } from '~/constants/index'
import { Avatar, Dropdown, DropdownItem, Popover } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectUser } from '~/redux/user/userSlice'
import { Button } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { AppDispatch } from '~/redux/store'

const Header = () => {
  const location = useLocation()
  const pathName = location.pathname
  let user = useSelector(selectUser)

  let dispatch = useDispatch<AppDispatch>()

  let handleLogout = () => {
    // Handle logout logic here
    dispatch(logoutUserAPI())
  }

  return (
    <header className='fixed top-0 bottom-0 overflow-y-auto custom-scrollbar flex flex-col justify-between mb-7 h-screen py-4'>
      <div className='h-header py-2 flex justify-start items-center'>
        <div className='text-white text-center'>
          <img
            className='light:hidden dark:block'
            width='35'
            height='35'
            src='https://img.icons8.com/ios/50/FFFFFF/twitterx--v2.png'
            alt='twitterx--v2'
          />
          <img
            className='light:block dark:hidden'
            width='50'
            height='50'
            src='https://img.icons8.com/ios-filled/50/1A1A1A/twitterx--v2.png'
            alt='twitterx--v2'
          />
        </div>
      </div>

      <nav className='flex flex-col gap-3'>
        {optionNavBar.map((option) => {
          let pathname = option.pathName //vì tragn profile là trường hợp đặc biệt có dạng param lên phải xử lý thêm
          if (option.pathName === '/profile') {
            pathname = `/profile/${user.userId}`
          }
          let icon = pathname === pathName ? option.iconButtonActive : option.iconButton
          return (
            <Link to={pathname || '/home'} key={option.textButton}>
              <Button
                pill
                className={`hover:!bg-zinc-800 text-md focus:ring-0 ${pathname === pathName ? 'font-bold' : ''}`}
                size='md'
              >
                {icon}
                {option.textButton}
              </Button>
            </Link>
          )
        })}
        <Dropdown
          className='w-max !fixed z-1'
          placement='top-start'
          label={undefined}
          dismissOnClick={false}
          renderTrigger={() => (
            <span>
              <Button className='hover:!bg-zinc-800 focus:ring-0' pill size='md'>
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
                More
              </Button>
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
        <div className='xl:block hidden'>
          <Button pill size='xl' className='focus:ring-0 w-full font-extrabold dark:!bg-white dark:!text-black'>
            Post
          </Button>
        </div>
        <p className='w-12 h-12 flex items-center justify-center bg-black rounded-full xl:hidden'>
          <img
            width='35'
            height='35'
            src={`${user.avatarUrl ? user.avatarUrl : 'https://img.icons8.com/sf-regular/48/FFFFFF/leaf.png'}`}
            alt='leaf'
          />
        </p>
      </div>

      <Popover
        placement='top'
        trigger='click'
        aria-labelledby='default-popover'
        content={
          <ul className='font-bold dark:text-white'>
            <li className='pr-14 pl-4 py-4 hover:bg-[#ffffff1a] cursor-pointer'>Add an existing account</li>
            <li className='pr-14 pl-4 py-4 hover:bg-[#ffffff1a] cursor-pointer' onClick={handleLogout}>
              Log out @{user.username}
            </li>
          </ul>
        }
        theme={{
          base: '!fixed z-50 inline-block border-white rounded-3xl shadow-[0_0px_18px_#ffffff47] overflow-hidden bg-white outline-none dark:bg-black'
        }}
      >
        {/* User */}
        <div className='rounded-full flex gap-5 items-center justify-center mt-4 cursor-pointer hover:bg-[#ffffff1a] p-2'>
          {/* <Avatar img='/src/assets/twitter.png' alt='avatar of Jese' rounded /> */}
          <Avatar className='mr-3 xl:mr-0' rounded />
          <div className='xl:flex flex-col items-center justify-center hidden'>
            <p className='font-bold dark:text-white'>{user.displayName || user.username}</p>
            <p className='text-sm text-zinc-500'>@{user.username}</p>
          </div>
          <span className='dark:text-white text-2xl'>
            <FontAwesomeIcon icon={faEllipsis} />
          </span>
        </div>
      </Popover>
    </header>
  )
}

export default Header
