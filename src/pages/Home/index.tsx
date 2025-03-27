import Content from './Content'
import SideBar from './SideBar'

const Home = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Content />
      <SideBar />
    </div>
  )
}

export default Home
