import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '~/components/Popup'
import { AppDispatch } from '~/redux/store'
import { selectUser, setUser } from '~/redux/user/userSlice'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  USERNAME_RULE,
  USERNAME_RULE_MESSAGE,
  validateDateInput
} from '~/utils/validators'
import { Datepicker, FloatingLabel, HelperText } from 'flowbite-react'

interface Step1Props {
  setStep: (step: number) => void
  onClose: () => void
}

export default function Step1({ setStep, onClose }: Step1Props) {
  const {
    register,
    control,
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
      birthDate: user.birthDate || ''
    })
  }, [dispatch]) //xử lý trong trường hợp khi quay lại từ step sau đó thì vẫn sẽ còn dữ liệu

  

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
    <Popup onNavigate={onClose} type='close'>
      <form className='px-8 pb-8' onSubmit={handleSubmit(submitRegister)}>
        <h2 className='text-2xl font-bold text-black dark:text-white'>Tạo tài khoản của bạn</h2>
        <div className='mt-5'>
          <FloatingLabel
            type='text'
            label='Tên'
            variant='outlined'
            {...register('username', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: USERNAME_RULE,
                message: USERNAME_RULE_MESSAGE
              }
            })}
          />
          {/* Error */}
          <HelperText color='failure'>{errors?.username?.message as string}</HelperText>
        </div>
        <div className='mt-5'>
          <FloatingLabel
            type='email'
            label='Email'
            variant='outlined'
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
          />
          {/* Error */}
          <HelperText color='failure'>{errors?.email?.message as string}</HelperText>
        </div>
        <div className='dark:text-white mt-5'>
          <h3 className='font-semibold text-md'>Ngày sinh</h3>
          <span className='text-sm text-gray-500 mt-1'>
            Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của bạn, ngay cả khi tài khoản này dành cho doanh
            nghiệp, thú cưng hoặc thứ gì khác.
          </span>
        </div>

        {/* Date */}
        <div className='mt-5'>
          <Controller
            name='birthDate'
            control={control}
            rules={{
              required: 'Ngày sinh là bắt buộc',
              validate: validateDateInput
            }}
            render={({ field }) => (
              <Datepicker
                {...field}
                theme={{
                  root: {
                    input: {
                      field: {
                        input: {
                          base: 'dark:!bg-black light:!bg-white'
                        }
                      }
                    }
                  }
                }}
              />
            )}
          />
          {/* Error */}
          <HelperText color='failure'>{errors?.birthDate?.message as string}</HelperText>
        </div>

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
