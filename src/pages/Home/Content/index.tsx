import { useState } from 'react'
import Publish from './Publish'
import Tabs from './Tabs'
import { OPTION_TABS } from '~/constants'
import Tweets from '~/components/Tweets'
import { tweets } from '~/mockData'

const Content = () => {
  const [tab, setTab] = useState<(typeof OPTION_TABS)[keyof typeof OPTION_TABS]>(OPTION_TABS.FOR_YOU)
  /**
   * Ý tưởng:
   * Sẽ có 1 biens state để nhận vào dữ liệu render ra và dự liệu sẽ lấy trong redux
   * Trong redux có 2 cái slice 1 cái chứa following và 1 cái chứa các tweet in the world
   * Tùy thuộc vào cái tab hiện tại thì sẽ set lại cái state dữ liệu là 1 trong 2 cái slice redux đảm bảo sẽ vẫn giữ nguyên dữ liệu của tab mà k phải query lại
   */

  return (
    <div className='border-[1px] h-screen'>
      {/* Tabs */}
      <Tabs tab={tab} setTab={setTab} />
      <Publish />
      <Tweets tweets={tweets} />
    </div>
  )
}

export default Content
