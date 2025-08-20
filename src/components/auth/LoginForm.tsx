import { createSignal, Show } from 'solid-js'
import { authActions } from '../../lib/authStore'

interface LoginFormProps {
  onClose?: () => void
  onSwitchToRegister?: () => void
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await authActions.signIn(email(), password())
    if (!result.success) {
      setError(result.error?.message || 'Failed to sign in')
    } else {
      props.onClose?.()
    }

    setIsLoading(false)
  }

  return (
    <div class="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Sign In</h2>
        <Show when={props.onClose}>
          <button onClick={props.onClose} class="text-gray-400 hover:text-white">✕</button>
        </Show>
      </div>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input
            id="password"
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <Show when={error()}>
          <div class="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-800">
            {error()}
          </div>
        </Show>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading()}
        >
          {isLoading() ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div class="mt-4 text-sm text-gray-400 text-center">
        Don't have an account?{' '}
        <button onClick={props.onSwitchToRegister} class="text-blue-400 hover:text-blue-300">
          Sign up
        </button>
      </div>
    </div>
  )
}