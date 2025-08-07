import Header from '~/components/Header'

import { FC, ReactNode } from 'react'

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='container dark:bg-black min-h-screen'>
      <div className='grid xl:grid-cols-5 gap-2 grid-cols-16'>
        <Header />
        <main className='xl:col-span-4 !col-start-2 col-span-12 text-center'>{children}</main>
      </div>
    </div>
  )
}

export default Main
