import { createStore } from 'vuex'
import { supabase } from '../utils/supabase'
import { sanitizeInput, sanitizeFormData } from '../utils'

// minimal auth store implementation

const store = createStore({
  state() {
    return {
      user: {},
      isLoggedIn: false,
      formError: '',
      isSubmitting: false
    }
  },

  mutations: {
    async signUpWithPassword(state, payload) {
      const { firstName, lastName, email } = sanitizeFormData(payload.data)
      state.isSubmitting = true

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: payload.data.password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName
            }
          }
        })

        if (error) throw error

        state.user = data
        state.isLoggedIn = true
        payload.router.push('/')
      } catch (error) {
        state.formError = error.message
      } finally {
        state.isSubmitting = false
      }
    },
    async loginWithPassword(state, payload) {
      const { email, password } = payload.data
      state.isSubmitting = true

      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email: sanitizeInput(email),
          password
        })

        if (error) throw error

        state.user = data
        state.isLoggedIn = true
        payload.router.push('/')
      } catch (error) {
        state.formError = error.message
      } finally {
        state.isSubmitting = false
      }
    },

    async logout(state, router) {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        state.user = {}
        state.isLoggedIn = false
        router.push('/login')
      } catch (error) {
        state.formError = error.message
      }
    },

    clearFormError(state) {
      state.formError = ''
    }
  }
})

export default store
