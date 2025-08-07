import React, { useState } from 'react'
import { OPTION_TABS } from '~/constants'

interface TabsProps {
  tab: string
  setTab: Function
}

const Tabs: React.FC<TabsProps> = ({ tab, setTab }) => {
  const setTabForyou = () => {
    setTab(OPTION_TABS.FOR_YOU)
  }

  const setTabFollowing = () => {
    setTab(OPTION_TABS.FOLLOWING)
  }
  return (
    <div className='bg-[#ffffffd9] backdrop-blur-md sticky top-0 z-10 dark:bg-black'>
      {/* Tablist */}
      <div className='flex justify-center items-center border-b-[1px] transition-all dark:border-zinc-800'>
        <div
          className={`py-4 w-1/2 hover:bg-zinc-200 transition-all relative dark:hover:bg-zinc-800 ${
            tab === OPTION_TABS.FOR_YOU ? 'font-semibold dark:text-white' : 'text-zinc-600 font-semibold'
          }`}
          onClick={setTabForyou}
        >
          <span className='py-4'>{OPTION_TABS.FOR_YOU}</span>
          {tab === OPTION_TABS.FOR_YOU && (
            <div className='absolute bottom-0 left-[50%] -translate-x-1/2 h-1 w-16 bg-blue-500 rounded-full'></div>
          )}
        </div>
        <div
          className={`py-4 w-1/2 hover:bg-zinc-200 transition-all relative dark:hover:bg-zinc-800 ${
            tab === OPTION_TABS.FOLLOWING ? 'font-semibold dark:text-white' : 'text-zinc-600 font-semibold'
          }`}
          onClick={setTabFollowing}
        >
          <span className='py-4'>{OPTION_TABS.FOLLOWING}</span>
          {tab === OPTION_TABS.FOLLOWING && (
            <div className='absolute bottom-0 left-[50%] -translate-x-1/2 h-1 w-16 bg-blue-500 rounded-full'></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tabs
