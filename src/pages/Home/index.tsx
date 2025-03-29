import Content from './Content'
import SideBar from './SideBar'

const Home = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        <Content />
      </div>
      <SideBar />
    </div>
  )
}

export default Home
