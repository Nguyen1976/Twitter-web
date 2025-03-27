import Content from './Content'
import SideBar from './SideBar'

const Main = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <Content />
      <SideBar />
    </div>
  )
}

export default Main
