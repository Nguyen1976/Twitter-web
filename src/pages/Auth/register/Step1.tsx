import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { setUser } from '~/redux/user/userSlice'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

interface Step1Props {
  setStep: (step: number) => void
}

export default function Step1({ setStep }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch<AppDispatch>()

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
        birthdate: new Date(data.birthdate)
      })
    )
    setStep(2)
  }

  return (
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
        <p className='text-red-500 text-sm mt-1 ml-1'>{errors?.username?.message as string}</p>
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
        <p className='text-red-500 text-sm mt-1 ml-1'>{errors?.email?.message as string}</p>
      </p>
      <p className='dark:text-white mt-10'>
        <h3 className='font-semibold text-md'>Ngày sinh</h3>
        <p className='text-sm text-gray-500 mt-1'>
          Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của bạn, ngay cả khi tài khoản này dành cho doanh
          nghiệp, thú cưng hoặc thứ gì khác.
        </p>
      </p>

      {/* Date */}
      <p>
        <input
          type='date'
          className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
          {...register('birthdate', { required: 'Ngày sinh là bắt buộc', validate: validateDateInput })}
        />
        {/* Error */}
        <p className='text-red-500 text-sm mt-1 ml-1'>{errors?.birthdate?.message as string}</p>
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
  )
}
