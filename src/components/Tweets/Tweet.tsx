import { Avatar, Tooltip } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const tweet = {
  _id: 'tweet-id-1',
  user: {
    _id: 'user-id-1',
    name: 'World of engineering',
    avatar: '',
    verified: true,
    username: '@engineers_feed'
  },
  content:
    '\"We, the unwilling, led by the unknowing, are doing the impossible for the ungrateful. We have done so much, for so long, with so little, we are now qualified to do anything with nothing.\"\n- Unknown',
  images: [
    // 'https://pbs.twimg.com/media/Gn9iAysWEAACrMQ?format=png&name=small',
    // 'https://pbs.twimg.com/media/Gn9iAysWEAACrMQ?format=png&name=small',
    // 'https://pbs.twimg.com/media/Gn9iAysWEAACrMQ?format=png&name=small'
  ],
  videos: [''],
  likes: ['user-id-1'],
  retweets: ['user-id-1'],
  createdAt: 1743348205629
}

const Tweet = () => {
  return (
    <div className='w-full p-3 cursor-pointer border-t-[1px]'>
      <div className='flex gap-2'>
        <div className='flex items-start'>
          <Avatar
            img='https://pbs.twimg.com/media/Gn7-TmQWEAAPJ7C?format=jpg&name=small'
            alt='avatar of Jese'
            rounded
          />
        </div>
        <div className='flex-1'>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <div className='font-semibold'>{tweet.user.name}</div>
              <div className='text-zinc-400'>{tweet.user.username}</div>
              <Tooltip content={moment(tweet.createdAt).format('LT MMM D, YYYY')} arrow={false} placement='bottom'>
                <div className='text-zinc-400 hover:underline'>{moment(tweet.createdAt).format('MMM D')}</div>
              </Tooltip>
            </div>
            <Tooltip content='More' arrow={false} placement='bottom'>
              <div className='hover:bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center'>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </Tooltip>
          </div>
          <div className='whitespace-pre-line text-start'>{tweet.content}</div>
          {tweet?.images?.length && (
            <div className='rounded-xl overflow-hidden'>
              {tweet.images.length === 1 && (
                <div>
                  <img src={tweet.images[0]} className='w-full h-auto object-cover' />
                </div>
              )}

              {tweet.images.length === 2 && (
                <div className='grid grid-cols-2 gap-1'>
                  {tweet.images.map((img, idx) => (
                    <img key={idx} src={img} className='w-full h-64 object-cover' />
                  ))}
                </div>
              )}

              {tweet.images.length === 3 && (
                <div className='grid grid-cols-2 gap-1'>
                  <img src={tweet.images[0]} className='col-span-1 w-full h-[260px] object-cover' />
                  <div className='grid grid-rows-2 gap-1'>
                    <img src={tweet.images[1]} className='w-full h-32 object-cover' />
                    <img src={tweet.images[2]} className='w-full h-32 object-cover' />
                  </div>
                </div>
              )}

              {tweet.images.length >= 4 && (
                <div className='grid grid-cols-2 gap-1'>
                  {tweet.images.slice(0, 4).map((img, idx) => (
                    <img key={idx} src={img} className='w-full h-48 object-cover' />
                  ))}
                </div>
              )}
            </div>
          )}
          {tweet?.videos?.length && <div></div>}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
