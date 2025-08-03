import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

type SignupModalProps = {
  onClose: () => void
}

export function SignupPopup({ onClose }: SignupModalProps) {
  return (
    <>
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
          {/* form */}
          <form className='px-8 pb-8'>
            <h2 className='text-2xl font-bold text-black dark:text-white'>Tạo tài khoản của bạn</h2>
            <p>
              <input
                type='text'
                placeholder='Tên'
                className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              />
              {/* Error */}
              <p className='text-red-500 text-sm mt-1 ml-1'></p>
            </p>
            <p>
              <input
                type='email'
                placeholder='Email'
                className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              />
              {/* Error */}
              <p className='text-red-500 text-sm mt-1 ml-1'></p>
            </p>
            <p className='dark:text-white mt-10'>
              <h3 className='font-semibold text-md'>Ngày sinh</h3>
              <p className='text-sm text-gray-500 mt-1'>
                Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của bạn, ngay cả khi tài khoản này dành cho
                doanh nghiệp, thú cưng hoặc thứ gì khác.
              </p>
            </p>

            {/* Date */}
            <p>
              <input
                type='date'
                className='w-full outline-none bg-transparent border border-1 border-zinc-300 rounded-md p-2 dark:text-white text-black h-14 mt-5'
              />
              {/* Error */}
              <p className='text-red-500 text-sm mt-1 ml-1'></p>
            </p>

            {/* Bước tiếp theo */}
            <button className='dark:bg-white dark:text-black font-bold rounded-full p-3 mt-10 w-full'>Tiếp theo</button>
          </form>
        </div>
      </div>
    </>
  )
}
