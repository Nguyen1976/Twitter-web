import Main from './Main/Main'
import Header from './Header'

const Home = () => {
  return (
    <div className='container'>
      <div className='grid grid-cols-4 gap-4'>
        <Header />
        <main className='col-span-3'>
          <Main />
        </main>
      </div>
    </div>
  )
}

export default Home
