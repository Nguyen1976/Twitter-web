import { useParams } from 'react-router-dom'

export default function Profile() {
  let userId = useParams<{ userId: string }>().userId
  return (
    <>
    {/* Head */}
    
    </>
  )
}
