import { createSignal, createEffect } from 'solid-js'
import { supabase, authHelpers, type User, isSupabaseConfigured } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Auth state signals
const [user, setUser] = createSignal<SupabaseUser | null>(null)
const [userProfile, setUserProfile] = createSignal<User | null>(null)
const [loading, setLoading] = createSignal(true)
const [isAuthenticated, setIsAuthenticated] = createSignal(false)

// Initialize auth state
const initializeAuth = async () => {
  try {
    if (!isSupabaseConfigured) {
      console.warn('Auth disabled: Supabase is not configured')
      setLoading(false)
      return
    }
    
    const { user: currentUser } = await authHelpers.getCurrentUser()
    
    if (currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
      
      // Get user profile from users table
      const { data: profile } = await authHelpers.getUserProfile(currentUser.id)
      if (profile) {
        setUserProfile(profile)
      }
    }
  } catch (error) {
    console.error('Error initializing auth:', error)
  } finally {
    setLoading(false)
  }
}

// Listen for auth changes (only if Supabase is configured)
if (isSupabaseConfigured && supabase) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      setUser(session.user)
      setIsAuthenticated(true)
      
      // Get or create user profile
      const { data: profile } = await authHelpers.getUserProfile(session.user.id)
      if (profile) {
        setUserProfile(profile)
      } else {
        // Create new user profile
        const { data: newProfile } = await authHelpers.upsertUserProfile(session.user.id, {
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
          balance: 0,
          total_portfolio_value: 0
        })
        if (newProfile) {
          setUserProfile(newProfile)
        }
      }
    } else if (event === 'SIGNED_OUT') {
      setUser(null)
      setUserProfile(null)
      setIsAuthenticated(false)
    }
    setLoading(false)
  })
}

// Auth actions
const authActions = {
  async signUp(email: string, password: string, username?: string) {
    if (!isSupabaseConfigured) {
      return { 
        success: false, 
        error: { message: 'Authentication is not available. Please configure Supabase environment variables.' } 
      }
    }
    
    setLoading(true)
    try {
      const { data, error } = await authHelpers.signUp(email, password, username)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      return { 
        success: false, 
        error: { message: 'Authentication is not available. Please configure Supabase environment variables.' } 
      }
    }
    
    setLoading(true)
    try {
      const { data, error } = await authHelpers.signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  },

  async signOut() {
    if (!isSupabaseConfigured) {
      return { 
        success: false, 
        error: { message: 'Authentication is not available. Please configure Supabase environment variables.' } 
      }
    }
    
    setLoading(true)
    try {
      const { error } = await authHelpers.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }
}

// Initialize auth on module load
initializeAuth()

export {
  user,
  userProfile,
  loading,
  isAuthenticated,
  authActions
}