import { useEffect, useState } from 'react'
import GoogleLoginButton from './GoogleLoginButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignupPopup } from './register/SignupPopup'
import SignInPopup from './signin/SignInPopup'
import { Button } from 'flowbite-react'

type AuthProps = {
  showSignupPopup?: boolean
  showSigninPopup?: boolean
}

const Auth = ({ showSignupPopup = false, showSigninPopup = false }: AuthProps) => {
  const [isOpenSignupPopup, setIsOpenSignupPopup] = useState(false)
  const [isOpenSigninPopup, setIsOpenSigninPopup] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (showSignupPopup || location.pathname === '/i/flow/signup') {
      setIsOpenSignupPopup(true)
    } else {
      setIsOpenSignupPopup(false)
    }
    if (showSigninPopup || location.pathname === '/i/flow/signin') {
      setIsOpenSigninPopup(true)
    } else {
      setIsOpenSigninPopup(false)
    }
  }, [showSignupPopup, showSigninPopup, location])

  const handleClose = () => {
    setIsOpenSignupPopup(false)
    setIsOpenSigninPopup(false)
    navigate('/')
  }

  return (
    <>
      {isOpenSignupPopup && <SignupPopup onClose={handleClose} />}
      {isOpenSigninPopup && <SignInPopup onClose={handleClose} />}
      <div className='bg-white dark:bg-black'>
        <div className='flex items-center h-screen gap-10'>
          <div className='w-1/2 flex justify-center items-center'>
            <div className='w-1/2 dark:hidden'>
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <g>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'></path>
                </g>
              </svg>
            </div>
            <div className='w-1/2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='350'
                height='350'
                viewBox='0 0 50 50'
                style={{ fill: '#FFFFFF' }}
              >
                <path d='M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z'></path>
              </svg>
            </div>
          </div>
          <div className='w-1/2 flex flex-col justify-center pr-10'>
            <h1 className='font-black text-7xl font-playfair dark:text-white'>Đang diễn ra ngay bây giờ</h1>
            <h4 className='font-bold text-4xl mt-12 font-playfair dark:text-white'>Tham gia ngay</h4>
            <div className='mt-10 w-1/2'>
              <GoogleLoginButton />
              <div className='flex items-center justify-between mt-5'>
                <div className='h-[1px] bg-zinc-400 w-full mr-2'></div>
                <p className='dark:text-white'>HOẶC</p>
                <div className='h-[1px] bg-zinc-400 w-full ml-2'></div>
              </div>
              <Button
                className='dark:!bg-blue-500 w-full font-extrabold mt-5'
                size='md'
                pill
                onClick={() => navigate('/i/flow/signup')}
              >
                Tạo tài khoản
              </Button>

              {/* Điều khoản */}
              <p className='text-xs text-gray-500 mt-5'>
                Khi đăng ký, bạn đã đồng ý với{' '}
                <a href='#' className='text-blue-700'>
                  Điều khoản Dịch vụ
                </a>{' '}
                và{' '}
                <a href='#' className='text-blue-700'>
                  Chính sách Quyền riêng tư
                </a>
                , gồm cả{' '}
                <a href='#' className='text-blue-700'>
                  Sử dụng Cookie
                </a>
                .
              </p>

              {/* Đã có tài khoản */}
              <p className='font-bold mt-12 text-lg dark:text-white'>Đã có tài khoản?</p>
              <Button
                className='bg-transparent w-full mt-5 font-semibold !border !border-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700 dark:!border-gray-600'
                size='md'
                pill
                onClick={() => navigate('/i/flow/signin')}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
