import { useState } from 'react'
import Publish from './Publish'
import Tabs from './Tabs'
import { OPTION_TABS } from '~/constants'

const Content = () => {
  const [tab, setTab] = useState<(typeof OPTION_TABS)[keyof typeof OPTION_TABS]>(OPTION_TABS.FOR_YOU)
  
  return (
    <div className='border-[1px] h-screen'>
      {/* Tabs */}
      <Tabs tab={tab} setTab={setTab} />
      <Publish />
    </div>
  )
}

export default Content
