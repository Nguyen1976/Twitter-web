import { useForm } from 'react-hook-form'
import Popup from '~/components/Popup'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import GoogleLoginButton from '../GoogleLoginButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { loginUserAPI } from '~/redux/user/userSlice'

type FromData = {
  email: string
  password: string
}

export default function SignInPopup({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<FromData>()

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const submitLogin = async (data: FromData) => {
    try {
        await dispatch(loginUserAPI(data)).unwrap()
        navigate('/home')
    } catch (error) {
        setError('email', {
          type: 'manual',
          message: 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.'
        })
    }
  }
  return (
    <Popup onNavigate={onClose} type='close'>
      <h2 className='text-3xl font-bold text-black dark:text-white text-center mb-5'>Đăng nhập vào x</h2>
      <div className='px-20 pb-10'>
        <GoogleLoginButton />
        <div className='flex items-center justify-between mt-5'>
          <div className='h-[1px] bg-zinc-400 w-full mr-2'></div>
          <p className='dark:text-white'>hoặc</p>
          <div className='h-[1px] bg-zinc-400 w-full ml-2'></div>
        </div>
        <form className='mt-5' onSubmit={handleSubmit(submitLogin)}>
          <div>
            <input
              type='email'
              placeholder='Email'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                },
                onChange: () => clearErrors('email')
              })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.email?.message as string}</span>
          </div>
          <div>
            <input
              type='password'
              placeholder='Mật khẩu'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                },
                onChange: () => clearErrors('email')
              })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.password?.message as string}</span>
          </div>
          <button
            type='submit'
            className={`dark:bg-white dark:text-black font-bold rounded-full px-3 py-2 mt-10 w-full ${Object.keys(errors).length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={Object.keys(errors).length > 0}
          >
            Đăng nhập
          </button>
          {/* Xử lý quên mật khẩu sau */}
          <button
            className={`dark:bg-transparent dark:text-white dark:border-[1px] font-bold rounded-full px-3 py-2 mt-5 w-full ${Object.keys(errors).length ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Quên mật khẩu
          </button>
        </form>

        <p className='mt-5 text-gray-600 text-sm'>
          Không có tài khoản?{' '}
          <Link to='/i/flow/signup' className='text-blue-500 cursor-pointer'>
            Đăng ký
          </Link>
        </p>
      </div>
    </Popup>
  )
}
