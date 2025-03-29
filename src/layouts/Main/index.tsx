import Header from '~/components/Header'

import { FC, ReactNode } from 'react'

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='container'>
      <div className='grid grid-cols-4 gap-2'>
        <Header />
        <main className='col-span-3 col-start-2 text-center'>{children}</main>
      </div>
    </div>
  )
}

export default Main
