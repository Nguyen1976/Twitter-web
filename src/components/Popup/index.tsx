import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Popup({
  children,
  onNavigate,
  type
}: {
  children: React.ReactNode
  onNavigate: () => void
  type: 'close' | 'back'
}) {
  return (
    <div className='fixed inset-0 bg-white bg-opacity-15 flex items-center justify-center z-50'>
      <div className='bg-black p-4 shadow-lg dark:bg-black w-1/3 rounded-xl'>
        <div className='relative flex items-center mb-4 justify-center'>
          <button
            className='absolute flex items-center justify-center text-white w-10 h-10 hover:bg-gray-600 rounded-full p-2 cursor-pointer text-right left-0'
            onClick={onNavigate}
          >
            {type === 'close' ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faArrowLeft} />}
          </button>
          {/* logo */}
          <div className='text-white text-center'>
            <img
            className='light:hidden dark:block'
              width='35'
              height='35'
              src='https://img.icons8.com/ios/50/FFFFFF/twitterx--v2.png'
              alt='twitterx--v2'
            />
            <img
              className='light:block dark:hidden'
              width='50'
              height='50'
              src='https://img.icons8.com/ios-filled/50/1A1A1A/twitterx--v2.png'
              alt='twitterx--v2'
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
