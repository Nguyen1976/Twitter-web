// GoogleLoginButton.tsx
import { GoogleLogin, CredentialResponse, useGoogleLogin } from '@react-oauth/google'

const GoogleLoginButton: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login success', tokenResponse)
    },
    onError: (error) => {
      console.error('Login Failed:', error)
      alert('Đăng nhập thất bại. Vui lòng thử lại!')
    }
  })

  return (
    <button
      onClick={() => login()}
      className='flex items-center justify-center bg-white border border-gray-300 rounded-full py-2 px-4 w-full hover:bg-gray-100 transition-colors font-semibold'
    >
      <img
        src='https://developers.google.com/identity/images/g-logo.png'
        alt='google'
        style={{ width: 20, marginRight: 8 }}
      />
      Đăng nhập với Google
    </button>
  )
}

export default GoogleLoginButton
