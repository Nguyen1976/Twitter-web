import React from 'react'
import Main from '.'
import SideBar from '~/components/SideBar'

const MainSideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      <div className='grid xl:grid-cols-3 grid-cols-4 gap-4'>
        <div className='xl:col-span-2 col-span-3'>{children}</div>
        <SideBar />
      </div>
    </Main>
  )
}

export default MainSideBar
