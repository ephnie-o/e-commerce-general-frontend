import ProtectedRoute from '@/components/ui/ProtectedRoute'
import UserProfilePage from '@/components/user/UserProfilePage'

const page = () => {
  return (
    <ProtectedRoute>
      <UserProfilePage />
    </ProtectedRoute>
  )
}

export default page