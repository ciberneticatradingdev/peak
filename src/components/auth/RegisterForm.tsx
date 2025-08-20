import { createSignal, Show } from 'solid-js'
import { authActions } from '../../lib/authStore'

interface RegisterFormProps {
  onClose?: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterForm(props: RegisterFormProps) {
  const [email, setEmail] = createSignal('')
  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [confirmPassword, setConfirmPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [success, setSuccess] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    if (password() !== confirmPassword()) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password().length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    const result = await authActions.signUp(email(), password(), username())

    if (!result.success) {
      setError(result.error?.message || 'Failed to create account')
    } else {
      setSuccess(true)
      props.onClose?.()
    }

    setIsLoading(false)
  }

  return (
    <div class="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Create Account</h2>
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
          <label htmlFor="username" class="block text-sm font-medium text-gray-300">Username</label>
          <input
            id="username"
            type="text"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            required
            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your_username"
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

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword()}
            onInput={(e) => setConfirmPassword(e.currentTarget.value)}
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
          {isLoading() ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div class="mt-4 text-sm text-gray-400 text-center">
        Already have an account?{' '}
        <button onClick={props.onSwitchToLogin} class="text-blue-400 hover:text-blue-300">
          Sign in
        </button>
      </div>
    </div>
  )
}