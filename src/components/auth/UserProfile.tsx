import { Show } from 'solid-js'
import { user, userProfile, authActions, isAuthenticated } from '../../lib/authStore'

interface UserProfileProps {
  onLogout?: () => void
}

export default function UserProfile(props: UserProfileProps) {
  const handleLogout = async () => {
    await authActions.signOut()
    props.onLogout?.()
  }

  return (
    <div class="flex items-center space-x-3 text-white">
      <div class="flex flex-col leading-tight text-right">
        <span class="text-sm text-gray-300">Welcome</span>
        <strong class="text-base">{userProfile()?.username || user()?.email?.split('@')[0] || 'User'}</strong>
      </div>
      <button
        onClick={handleLogout}
        title="Sign out"
        class="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded"
      >
        Sign out
      </button>
    </div>
  )
}