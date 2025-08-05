import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '~/apis'
import { AppDispatch } from '~/redux/store'
import { selectUser, setUser } from '~/redux/user/userSlice'
import { RegisterData } from '~/types'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'

interface Step3Props {
  setStep: (step: number) => void
}

type FromData = {
  password: string
}

export default function Step3({ setStep }: Step3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromData>()

  const user = useSelector(selectUser)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const submitRegister = async (value: FromData) => {
    if (!user.username || !user.email || !user.birthDate) {
      // Nếu không có thông tin người dùng, chuyển về bước 1
      setStep(1)
      return
    } else {
      const registerData: RegisterData = {
        username: user.username,
        email: user.email,
        birthDate: user.birthDate,
        password: value.password
      }
      const response = (await registerAPI(registerData))
      if (response.success) {
        dispatch(setUser({ ...user, id: response.data }))
        navigate('/home')
      } else {
        // Xử lý lỗi đăng ký
        console.error('Đăng ký không thành công')
      }
    }
  }

  return (
    <div className='fixed inset-0 bg-white bg-opacity-15 flex items-center justify-center z-50'>
      <div className='bg-black p-4 shadow-lg dark:bg-black w-1/3 rounded-xl'>
        <div className='flex justify-between items-center mb-4'>
          <button
            className='flex items-center justify-center text-white w-10 h-10 hover:bg-gray-600 rounded-full p-2 cursor-pointer text-right'
            onClick={() => setStep(1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <form className='px-8 pb-8' onSubmit={handleSubmit(submitRegister)}>
          <h2 className='text-3xl font-bold text-black dark:text-white'>Bạn sẽ cần có mật khẩu</h2>
          <p className='text-sm text-gray-500 mt-3'>Đảm bảo mật khẩu có 8 ký tự trở lên.</p>
          <p>
            <input
              type='password'
              placeholder='Mật khẩu'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.password?.message as string}</span>
          </p>
          {/* Bước tiếp theo */}
          <button
            type='submit'
            className={`dark:bg-white dark:text-black font-bold rounded-full p-3 mt-10 w-full ${Object.keys(errors).length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={Object.keys(errors).length > 0}
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}
