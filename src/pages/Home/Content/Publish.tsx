import { Avatar, Tooltip } from 'flowbite-react'
import Button from '~/components/Button'
import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas, faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faFaceSmile } from '@fortawesome/free-regular-svg-icons'

const Publish = () => {
  const [content, setContent] = useState<string>('')
  return (
    <div className='flex gap-3 p-3 border-b-[1px]'>
      <Avatar rounded className='flex items-start' />
      <div className='flex-1'>
        <div className='border-b-[1px] pb-4 mb-4'>
          {/* <input type='text' placeholder="What's happening?" className='border-none outline-none text-xl w-full mt-1' /> */}
          <TextareaAutosize
            maxRows={17}
            onChange={(e) => setContent(e.target.value)}
            className='border-none outline-none text-xl w-full mt-1 resize-none'
          />
          <div className='flex items-center gap-1 text-sm font-bold text-blue-500 mt-3'>
            <FontAwesomeIcon icon={faEarthAmericas} />
            <p>Everyone can reply</p>
          </div>
        </div>
        <div className='text-blue-500'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-1'>
              <Tooltip content='Media' arrow={false} placement='bottom'>
                <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-100 transition-all duration-300'>
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </Tooltip>
              <Tooltip content='GIF' arrow={false} placement='bottom'>
                <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-100 transition-all duration-300'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                    />
                  </svg>
                </div>
              </Tooltip>
              <Tooltip content='Emoji' arrow={false} placement='bottom'>
                <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-100 transition-all duration-300'>
                  <FontAwesomeIcon icon={faFaceSmile} />
                </div>
              </Tooltip>
              <Tooltip content='Schedule' arrow={false} placement='bottom'>
                <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-100 transition-all duration-300'>
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
              </Tooltip>
              <Tooltip content='Media' arrow={false} placement='bottom'>
                <div className='flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-100 transition-all duration-300'>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
              </Tooltip>
            </div>
            <Button text='Post' className='bg-zinc-500' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publish
