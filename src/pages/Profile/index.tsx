import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'

import { faArrowLeft, faCalendarDays, faLock, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import EditProfile from './EditProfile'
import { getUserProfileAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser, updateUserProfileAPI } from '~/redux/user/userSlice'
import { AppDispatch } from '~/redux/store'

type ProfileProps = {
  showEditPopup?: boolean
}

const Profile: React.FC<ProfileProps> = ({ showEditPopup }) => {
  const [isOpenEditPopup, setIsOpenEditPopup] = useState<boolean>(!!showEditPopup)
  const location = useLocation()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState<any>(null)

  let userId = useParams<{ userId: string }>().userId
  const user = useSelector(selectUser)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        return
      }
      try {
        const userProfileRes = await getUserProfileAPI(userId)
        setUserProfile(userProfileRes.data)
        //Nếu id user là chính chủ thì sẽ dispatch user để update lại redux bời vì khi khác id thì trang hiện tại sẽ là xem profile của 1 user khác
        if (userId === user.userId) {
          console.log(userProfileRes.data)
          dispatch(setUser(userProfileRes.data))
        }
      } catch (err: any) {
        console.error('Error fetching user profile:', err)
        navigate('/home')
      }
    }
    fetchUserProfile()
  }, [userId])

  useEffect(() => {
    if (showEditPopup || location.pathname === '/settings/profile') {
      setIsOpenEditPopup(true)
    } else {
      setIsOpenEditPopup(false)
    }
  }, [location.pathname])

  const handleClose = () => {
    setIsOpenEditPopup(false)
    navigate(-1)
  }

  return (
    <>
      {isOpenEditPopup && <EditProfile onClose={handleClose} />}
      {userProfile && (
        <>
          {/* Head */}
          <div className='w-full z-10 sticky top-0 bg-[#000000a6] border-[1px] dark:border-zinc-800 dark:text-white'>
            <div className='flex items-center justify-between py-1 px-4'>
              <div className='flex items-center gap-10'>
                <span className='cursor-pointer' onClick={() => navigate('/home')}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                <div className='items-start flex flex-col'>
                  <div className='flex items-center gap-4'>
                    <p className='font-bold text-xl'>{userProfile.displayName ?? userProfile.username ?? ''}</p>
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
            {userProfile.headerImageUrl ? (
              <img src={userProfile.headerImageUrl} alt='' className='h-[200px] w-full object-cover' />
            ) : (
              <div className='h-[200px] w-full bg-[#333639]' />
            )}
            {/* Edit profile */}
            <div className='relative flex justify-end py-3 px-6'>
              <div className='h-36 w-36 rounded-full overflow-hidden absolute -top-[72px] left-6 border-4 border-black'>
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt='' />
                ) : (
                  <div className='h-full w-full bg-[#333639]' />
                )}
              </div>
              <Button
                pill
                className='rounded-full border-[1px] border-zinc-500 dark:text-white dark:bg-black font-medium'
                onClick={() => navigate('/settings/profile')}
              >
                Edit profile
              </Button>
            </div>

            {/* ... */}
            <div className='mt-5 px-5'>
              <div className='items-start flex flex-col dark:text-white'>
                <div className='flex items-center gap-4'>
                  <p className='font-bold text-xl'>{userProfile.displayName ?? userProfile.username ?? ''}</p>
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <p className='text-sm text-zinc-600'>@{userProfile.username ?? ''}</p>
                {/* bio */}
                <div className='mt-2'>{userProfile.bio ?? ''}</div>
                {/* created-at */}
                <div className='text-zinc-600 flex items-center gap-2 mt-3'>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <p>Joined {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : ''}</p>
                </div>
                {/* Flow */}
                <div className='flex items-center gap-5 mt-2'>
                  <div className='flex items-center gap-2'>
                    <p>{userProfile.followingCount ?? 0}</p>
                    <p className='text-zinc-600'>Following</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p>{userProfile.followerCount ?? 0}</p>
                    <p className='text-zinc-600'>Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Tabs phần này sẽ xử lý sau khi bên backend làm xong*/}
    </>
  )
}

export default Profile
