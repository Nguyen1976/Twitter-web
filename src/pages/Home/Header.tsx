import Button from '~/components/Button'

const Header = () => {
  return (
    <header>
      <div className='h-header py-2 flex justify-start items-center'>
        <img className='h-logo' src='src/assets/twitter.png' alt='' />
      </div>
      <div>
        <Button />
      </div>
    </header>
  )
}

export default Header
