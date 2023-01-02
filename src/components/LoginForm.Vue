<template>
  <section class="auth">
    <h1 class="auth__title">Log in</h1>
    <form v-on:submit.prevent="loginWithPassword" class="auth__form" novalidate>
      <div class="auth__form__group">
        <label for="email" class="auth__form__label">Email</label>
        <input
          id="email"
          @input="resetFieldError"
          @change="validateField"
          type="email"
          v-model="form.email"
          :disabled="isSubmitting"
          class="auth__form__input"
        />
        <small v-if="errors?.email" class="auth__form__group__error"
          >&#9432; {{ errors.email }}</small
        >
      </div>
      <div class="auth__form__group">
        <label for="password" class="auth__form__label">Password</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          :disabled="isSubmitting"
          @input="resetFieldError"
          class="auth__form__input"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        />
        <small v-if="errors?.password" class="auth__form__group__error"
          >&#9432; {{ errors.password }}</small
        >
      </div>
      <div v-if="formError" class="auth__form__group">
        <small class="auth__form__group__error">&#9432; {{ formError }}</small>
      </div>
      <div class="auth__form__action">
        <button
          type="submit"
          class="auth__form__action__submit"
          :disabled="isSubmitting"
        >
          <span :class="isSubmitting ? 'spinner' : ''">Log in</span>
        </button>
      </div>
    </form>
    <div class="auth__footer">
      <p class="auth__footer__pwdreset">
        <RouterLink to="#" class="auth__footer__pwdreset_link"
          >Forgot your password?</RouterLink
        >
      </p>
      <p class="auth__footer__signup">
        {{ NON_MEMBER_QUESTION }}
        <RouterLink to="/signup" class="auth__footer__signup__link"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink, useRouter } from 'vue-router'
import { getFormErrors, getInputError } from './../utils'
import { NON_MEMBER_QUESTION } from '../utils/constants'
import './../assets/auth.css'

export default {
  name: 'LoginForm',
  setup() {
    const form = ref({
      email: '',
      password: ''
    })

    const errors = ref({})
    const store = useStore()
    const router = useRouter()
    const isSubmitting = computed(() => store.state.isSubmitting)
    const formError = computed(() => store.state.formError)

    const resetFieldError = (event) => {
      const { id: name } = event.target
      errors.value = { ...errors.value, [name]: '' }
    }

    const validateField = (event) => {
      const { id: name, value } = event.target
      const error = getInputError(name, value)
      errors.value = { ...errors.value, [name]: error }
    }

    const loginWithPassword = async () => {
      errors.value = getFormErrors(form.value)
      if (Object.values(errors.value).some((error) => !!error)) {
        return
      }

      store.commit('loginWithPassword', { data: form.value, router })
    }

    return {
      form,
      loginWithPassword,
      isSubmitting,
      errors,
      resetFieldError,
      validateField,
      NON_MEMBER_QUESTION,
      formError
    }
  }
}
</script>
