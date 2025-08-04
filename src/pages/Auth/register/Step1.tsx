import React from 'react'
import { useForm } from 'react-hook-form'
import { checkEmailExistsAPI, checkUsernameExistsAPI } from '~/apis'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

export default function Step1() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm()

  //check email exists
  const checkEmailExists = async (email: string) => {
    //call api to check if email exists
    console.log('Checking if email exists:', email)
    const response = (await checkEmailExistsAPI(email)) as { data: boolean }
    if (response.data) {
      setError('email', {
        type: 'manual',
        message: 'Email đã tồn tại'
      })
    } else {
      clearErrors('email')
    }
  }
  const debouncedCheckEmailExists = useDebounceFn(checkEmailExists, 500)

  const checkUsernameExists = async (username: string) => {
    const response = (await checkUsernameExistsAPI(username)) as { data: boolean }
    if (response.data) {
      setError('username', {
        type: 'manual',
        message: 'Username đã tồn tại'
      })
    } else {
      clearErrors('username')
    }
  }
  const debouncedCheckUsernameExists = useDebounceFn(checkUsernameExists, 500)

  const submitRegister = (data: any) => {
    // Handle registration logic here
    console.log(`Name: ${data.name}, Email: ${data.email}, Birthdate: ${data.birthdate}`)
    //config redux
  }

  return (
    <form className='px-8 pb-8' onSubmit={handleSubmit(submitRegister)}>
      <h2 className='text-2xl font-bold text-black dark:text-white'>Tạo tài khoản của bạn</h2>
      <p>
        <input
          type='text'
          placeholder='Tên'
          className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
          {...register('username', { required: 'Tên là bắt buộc' })}
          onChange={(e) => {
            debouncedCheckUsernameExists(e.target.value)
          }}
        />
        {/* Error */}
        <p className='text-red-500 text-sm mt-1 ml-1'>{errors?.username?.message as string}</p>
      </p>
      <p>
        <input
          type='email'
          placeholder='Email'
          className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
          {...register('email', { required: 'Email là bắt buộc' })}
          onChange={(e) => {
            debouncedCheckEmailExists(e.target.value)
          }}
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
          {...register('birthdate', { required: 'Ngày sinh là bắt buộc' })}
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
