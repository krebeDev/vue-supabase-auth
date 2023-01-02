<template>
  <section class="auth">
    <h1 class="auth__title">Create an account</h1>
    <form class="auth__form" @submit.prevent="signUpWithEmail" novalidate>
      <div class="auth__form__group">
        <label for="firstName" class="auth__form__label">First Name:</label>
        <input
          type="text"
          v-model="form.firstName"
          id="firstName"
          @input="resetFieldError"
          :disabled="isSubmitting"
          class="auth__form__input"
        />
        <small v-if="errors?.firstName" class="auth__form__group__error"
          >&#9432; {{ errors.firstName }}</small
        >
      </div>

      <div class="auth__form__group">
        <label for="lastName" class="auth__form__label">Last Name:</label>
        <input
          type="text"
          v-model="form.lastName"
          id="lastName"
          @input="resetFieldError"
          :disabled="isSubmitting"
          class="auth__form__input"
        />
        <small v-if="errors?.lastName" class="auth__form__group__error"
          >&#9432; {{ errors.lastName }}</small
        >
      </div>

      <div class="auth__form__group">
        <label for="email" class="auth__form__label">Email:</label>
        <input
          v-model="form.email"
          @input="resetFieldError"
          @change="validateField"
          id="email"
          type="email"
          :disabled="isSubmitting"
          placeholder="email@something.com"
          class="auth__form__input"
        />
        <small v-if="errors?.email" class="auth__form__group__error"
          >&#9432; {{ errors.email }}</small
        >
      </div>

      <div class="auth__form__group">
        <label for="password" class="auth__form__label">Password:</label>
        <input
          v-model="form.password"
          @input="resetFieldError"
          id="password"
          type="password"
          :disabled="isSubmitting"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          class="auth__form__input"
        />
        <small v-if="errors?.password" class="auth__form__group__error"
          >&#9432; {{ errors.password }}</small
        >
      </div>

      <div class="auth__form__group">
        <small v-if="formError" class="auth__form__group__error"
          >&#9432; {{ formError }}</small
        >
      </div>

      <div class="auth__form__action">
        <button
          type="submit"
          class="auth__form__action__submit"
          :disabled="isSubmitting"
        >
          <span :class="isSubmitting ? 'spinner' : ''">Sign Up</span>
        </button>
      </div>
    </form>
    <div class="auth__footer">
      <p class="auth__footer__terms">
        By clicking “Sign up” you agree to our
        <RouterLink to="#" class="auth__footer__terms_link"
          >Terms & Privacy Policy</RouterLink
        >
      </p>
      <p class="auth__footer__login">
        {{ MEMBER_QUESTION }}
        <RouterLink to="/login" class="auth__footer__login__link"
          >Log in</RouterLink
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
import { MEMBER_QUESTION } from '../utils/constants'
import './../assets/auth.css'

export default {
  name: 'SignUpForm',
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })

    const store = useStore()
    const router = useRouter()
    const isSubmitting = computed(() => store.state.isSubmitting)
    const formError = computed(() => store.state.formError)

    const errors = ref({})

    const resetFieldError = (event) => {
      const { id: name } = event.target
      errors.value = { ...errors.value, [name]: '', form: '' }
    }

    const validateField = (event) => {
      const { id: name, value } = event.target
      const error = getInputError(name, value)
      errors.value = { ...errors.value, [name]: error, form: '' }
    }

    const signUpWithEmail = async () => {
      errors.value = getFormErrors(form.value)
      if (Object.values(errors.value).some((error) => !!error)) {
        return
      }

      store.commit('signUpWithPassword', { data: form.value, router })
    }

    return {
      form,
      signUpWithEmail,
      isSubmitting,
      errors,
      resetFieldError,
      validateField,
      MEMBER_QUESTION,
      formError
    }
  }
}
</script>
