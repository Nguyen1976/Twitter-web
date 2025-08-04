import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Step1 from './Step1'

type SignupModalProps = {
  onClose: () => void
}

export function SignupPopup({ onClose }: SignupModalProps) {
  const [step, setStep] = useState<number>(1)

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

          {step === 1 && (
            <Step1 />
          )}

          {step === 2 && (
            <div>
              <h2 className='text-white text-lg font-bold mb-2'>Verify your email</h2>
              <p className='text-gray-400 mb-4'>A verification link has been sent to your email.</p>
              <button
                type='button'
                className='w-full bg-blue-500 text-white p-2 rounded-md'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
