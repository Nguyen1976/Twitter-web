import { faArrowLeft, faLock, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'

export default function Profile() {
  let userId = useParams<{ userId: string }>().userId
  return (
    <>
      {/* Head */}
      <div className='w-full z-10 sticky top-0 bg-[#000000a6] border-[1px] dark:border-zinc-800 dark:text-white'>
        <div className='flex items-center justify-between py-1 px-4'>
          <div className='flex items-center gap-10'>
            <FontAwesomeIcon icon={faArrowLeft} />
            <div className='items-start flex flex-col'>
              <div className='flex items-center gap-4'>
                <p className='font-bold text-xl'>Nguyen Nguyen</p>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <p className='text-sm text-zinc-600'>0 post</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      {/* Profile */}
      <div className='h-[1000px] text-2xl text-white'> profile</div>
      {/* Tabs phần này sẽ xử lý sau khi bên backend làm xong*/}
    </>
  )
}
