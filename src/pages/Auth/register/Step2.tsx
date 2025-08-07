import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { sendVerificationEmailAPI, verifyEmailAPI } from '~/apis'
import Popup from '~/components/Popup'
import { selectUser } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

interface Step2Props {
  setStep: (step: number) => void
}

type FromData = {
  otp: string
}

export default function Step2({ setStep }: Step2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<FromData>()

  const user = useSelector(selectUser)

  const [remainingTime, setRemainingTime] = useState(60)
  const [createdAtOtp, setCreatedAtOtp] = useState<number | null>(null)

  useEffect(() => {
    const updateRemainingTime = () => {
      if (createdAtOtp === null) {
        setRemainingTime(60)
        return
      }
      const now = Date.now()
      const diff = Math.floor((now - createdAtOtp) / 1000) // số giây đã trôi qua
      const remaining = Math.max(60 - diff, 0)
      setRemainingTime(remaining)
    }

    // Gọi lần đầu để cập nhật ngay
    updateRemainingTime()

    const interval = setInterval(() => {
      updateRemainingTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [createdAtOtp])

  const fetchVerificationEmail = async () => {
    const { data } = await sendVerificationEmailAPI(user.email, user.username)

    setCreatedAtOtp(data.createdAt)
  }
  useEffect(() => {
    fetchVerificationEmail()
  }, [])

  const submitRegister = async (value: FromData) => {
    const response = await verifyEmailAPI(user.email, value.otp)

    if (response.data) {
      clearErrors('otp')
      setStep(3)
    } else {
      setError('otp', {
        type: 'manual',
        message: 'Mã xác nhận không hợp lệ'
      })
    }
  }

  return (
    <Popup onNavigate={() => setStep(1)} type='back'>
      <form className='px-8 pb-8' onSubmit={handleSubmit(submitRegister)}>
        <h2 className='text-3xl font-bold text-black dark:text-white'>Chúng tôi đã gửi mã cho bạn</h2>
        <p className='text-sm text-gray-500 mt-3'>Nhập vào bên dưới để xác thực {user?.email}.</p>
        <p>
          <input
            type='text'
            placeholder='Mã xác nhận'
            className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
            {...register('otp', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {/* Error */}
          <span className='text-red-500 text-sm mt-1 ml-1'>{errors?.otp?.message as string}</span>
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          Bạn có thể gửi lại mã sau {remainingTime} giây.{' '}
          <span
            className={`cursor-pointer dark:text-blue-600 ${remainingTime === 0 ? '' : 'hidden'}`}
            onClick={fetchVerificationEmail}
          >
            Gửi lại mã
          </span>
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
    </Popup>
  )
}
