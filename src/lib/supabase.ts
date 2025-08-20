import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Log warning if Supabase is not configured
if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase is not configured. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client with fallback for missing config
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for the users table
export interface User {
  id: string
  wallet_address?: string
  username?: string
  email?: string
  created_at: string
  updated_at: string
  avatar_url?: string
  balance?: number
  total_portfolio_value?: number
}

// Auth helper functions
export const authHelpers = {
  // Sign up with email and password
  async signUp(email: string, password: string, username?: string) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please set up environment variables.' } 
      }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0]
        }
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    if (!supabase) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please set up environment variables.' } 
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    if (!supabase) {
      return { error: { message: 'Supabase is not configured. Please set up environment variables.' } }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    if (!supabase) {
      return { user: null, error: { message: 'Supabase is not configured. Please set up environment variables.' } }
    }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get user profile from users table
  async getUserProfile(userId: string) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase is not configured. Please set up environment variables.' } }
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Create or update user profile
  async upsertUserProfile(userId: string, profile: Partial<User>) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase is not configured. Please set up environment variables.' } }
    }
    const { data, error } = await supabase
      .from('users')
      .upsert({ id: userId, ...profile })
      .select()
      .single()
    return { data, error }
  }
}