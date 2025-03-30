import React from 'react'
import Tweet from './Tweet'

interface TweetsProps {
  tweets: unknown
}

const Tweets: React.FC<TweetsProps> = ({ tweets }) => {
  return (
    <Tweet />
  )
}

export default Tweets
