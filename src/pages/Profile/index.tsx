import { faArrowLeft, faCalendarDays, faLock, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserProfileAPI } from '~/apis'
import { AppDispatch } from '~/redux/store'

export default function Profile() {
  const [userProfile, setUserProfile] = useState<any>(null)
  let userId = useParams<{ userId: string }>().userId

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return
      const userProfileRes = await getUserProfileAPI(userId)
      setUserProfile(userProfileRes.data)
    }
    fetchUserProfile()
  }, [userId])

  return (
    <>
      {/* Head */}
      <div className='w-full z-10 sticky top-0 bg-[#000000a6] border-[1px] dark:border-zinc-800 dark:text-white'>
        <div className='flex items-center justify-between py-1 px-4'>
          <div className='flex items-center gap-10'>
            <FontAwesomeIcon icon={faArrowLeft} />
            <div className='items-start flex flex-col'>
              <div className='flex items-center gap-4'>
                <p className='font-bold text-xl'>{userProfile?.displayName ?? userProfile?.username ?? ''}</p>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <p className='text-sm text-zinc-600'>0 post</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      {/* Profile */}
      <div className='border-[1px] dark:border-zinc-800'>
        {/* header-img */}
        <img src='https://pbs.twimg.com/profile_banners/1541985824622796800/1754536449/1080x360' alt='' />
        {/* Edit profile */}
        <div className='relative flex justify-end py-3 px-6'>
          <div className='h-36 w-36 rounded-full overflow-hidden absolute -top-[72px] left-6 border-4 border-black'>
            <img src='https://pbs.twimg.com/profile_images/1541985856071667713/9VYgARp-_400x400.png' alt='' />
          </div>
          <button className='rounded-full px-4 py-1 border-[1px] border-zinc-500 dark:text-white dark:bg-black font-medium'>
            Edit profile
          </button>
        </div>

        {/* ... */}
        <div className='mt-5 px-5'>
          <div className='items-start flex flex-col dark:text-white'>
            <div className='flex items-center gap-4'>
              <p className='font-bold text-xl'>{userProfile?.displayName ?? userProfile?.username ?? ''}</p>
              <FontAwesomeIcon icon={faLock} />
            </div>
            <p className='text-sm text-zinc-600'>@{userProfile?.username ?? ''}</p>
            {/* bio */}
            <div className='mt-2'>{userProfile?.bio ?? ''}</div>
            {/* created-at */}
            <div className='text-zinc-600 flex items-center gap-2 mt-3'>
              <FontAwesomeIcon icon={faCalendarDays} />
              <p>Joined {new Date(userProfile?.createdAt).toLocaleDateString() ?? ''}</p>
            </div>
            {/* Flow */}
            <div className='flex items-center gap-5 mt-2'>
              <div className='flex items-center gap-2'>
                <p>{userProfile?.followingCount ?? 0}</p>
                <p className='text-zinc-600'>Following</p>
              </div>
              <div className='flex items-center gap-2'>
                <p>{userProfile?.followerCount ?? 0}</p>
                <p className='text-zinc-600'>Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs phần này sẽ xử lý sau khi bên backend làm xong*/}
    </>
  )
}
