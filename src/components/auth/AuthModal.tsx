import { createSignal, Show } from 'solid-js'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Portal } from 'solid-js/web'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export default function AuthModal(props: AuthModalProps) {
  const [mode, setMode] = createSignal<'login' | 'register'>(props.initialMode || 'login')

  const handleClose = () => {
    props.onClose()
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <Portal>
      <div 
        class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        onClick={handleBackdropClick}
      >
        <div class="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <Show when={mode() === 'login'}>
            <LoginForm 
              onClose={handleClose}
              onSwitchToRegister={() => setMode('register')}
            />
          </Show>
          
          <Show when={mode() === 'register'}>
            <RegisterForm 
              onClose={handleClose}
              onSwitchToLogin={() => setMode('login')}
            />
          </Show>
        </div>
      </div>
    </Portal>
  )
}