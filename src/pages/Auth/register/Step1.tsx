import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { selectUser, setUser } from '~/redux/user/userSlice'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

interface Step1Props {
  setStep: (step: number) => void
  onClose: () => void
}

export default function Step1({ setStep, onClose }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)

  useEffect(() => {
    reset({
      username: user.username || '',
      email: user.email || '',
      birthDate: user.birthDate || '',
    })
  }, [dispatch]) //xử lý trong trường hợp khi quay lại từ step sau đó thì vẫn sẽ còn dữ liệu

  const validateDateInput = (value: string) => {
    const today = new Date()
    const selectedDate = new Date(value)
    const age = today.getFullYear() - selectedDate.getFullYear()
    const monthDiff = today.getMonth() - selectedDate.getMonth()
    const dayDiff = today.getDate() - selectedDate.getDate()

    if (selectedDate > today) {
      return 'Ngày sinh không được lớn hơn ngày hiện tại'
    }

    if (age < 13 || (age === 13 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return 'Bạn phải đủ 13 tuổi trở lên'
    }

    return true
  }

  const submitRegister = (data: any) => {
    //Bắn dữ liệu lên redux ở đây
    dispatch(
      setUser({
        ...data,
        birthDate: new Date(data.birthDate).toISOString()
      })
    )
    setStep(2)
  }

  return (
    <div className='fixed inset-0 bg-white bg-opacity-15 flex items-center justify-center z-50'>
      <div className='bg-black p-4 shadow-lg dark:bg-black w-1/3 rounded-xl'>
        <div className='flex justify-between items-center mb-4'>
          <button
            className='flex items-center justify-center text-white w-10 h-10 hover:bg-gray-600 rounded-full p-2 cursor-pointer text-right'
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <form className='px-8 pb-8' onSubmit={handleSubmit(submitRegister)}>
          <h2 className='text-2xl font-bold text-black dark:text-white'>Tạo tài khoản của bạn</h2>
          <p>
            <input
              type='text'
              placeholder='Tên'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('username', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: NAME_RULE,
                  message: NAME_RULE_MESSAGE
                }
              })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.username?.message as string}</span>
          </p>
          <p>
            <input
              type='email'
              placeholder='Email'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('email', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.email?.message as string}</span>
          </p>
          <div className='dark:text-white mt-10'>
            <h3 className='font-semibold text-md'>Ngày sinh</h3>
            <span className='text-sm text-gray-500 mt-1'>
              Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của bạn, ngay cả khi tài khoản này dành cho doanh
              nghiệp, thú cưng hoặc thứ gì khác.
            </span>
          </div>

          {/* Date */}
          <p>
            <input
              type='date'
              className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              {...register('birthDate', { required: 'Ngày sinh là bắt buộc', validate: validateDateInput })}
            />
            {/* Error */}
            <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.birthDate?.message as string}</span>
          </p>

          {/* Bước tiếp theo */}
          <button
            type='submit'
            className={`dark:bg-white dark:text-black font-bold rounded-full p-3 mt-10 w-full ${Object.keys(errors).length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={Object.keys(errors).length > 0}
          >
            Tiếp theo
          </button>
        </form>
      </div>
    </div>
  )
}
