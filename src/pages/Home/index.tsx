import Content from './Content'
import SideBar from './SideBar'

const Home = () => {
  return (
    <div className='grid xl:grid-cols-3 grid-cols-4 gap-4'>
      <div className='xl:col-span-2 col-span-3'>
        <Content />
      </div>
      <SideBar />
    </div>
  )
}

export default Home
