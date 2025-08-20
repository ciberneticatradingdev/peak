import { Show, createSignal, onMount } from 'solid-js';
import { user, userProfile, loading, isAuthenticated, authActions } from '../../lib/authStore';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

export default function AuthButtons() {
  const [showModal, setShowModal] = createSignal(false);
  const [modalMode, setModalMode] = createSignal<'login' | 'register'>('login');

  // No need for onMount since auth is initialized in authStore

  const handleRegister = () => {
    setModalMode('register');
    setShowModal(true);
  };

  const handleLogin = () => {
    setModalMode('login');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Show
        when={isAuthenticated()}
        fallback={
          <div>
            <button 
              onClick={handleRegister}
              class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              REGISTER
            </button>
            <button 
              onClick={handleLogin}
              class="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              LOG IN
            </button>
          </div>
        }
      >
        <UserProfile />
      </Show>

      <Show when={showModal()}>
        <AuthModal 
          isOpen={showModal()}
          initialMode={modalMode()}
          onClose={closeModal}
        />
      </Show>
    </>
  );
}