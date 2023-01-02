import { MEMBER_QUESTION, NON_MEMBER_QUESTION } from './constants'

export const isValidEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email.trim())
}

export const getFiedlLabel = (field) => {
  return field
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

export const camelToCapitalized = (camelString) => {
  const words = camelString.split(/(?=[A-Z])/)
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const getInputError = (field, value) => {
  if (!value.trim()) {
    return `${camelToCapitalized(field)} is required`
  }

  switch (field) {
    case 'email':
      return isValidEmail(value) ? '' : 'Invalid email address'
    // We can add more cases here.
    // And also check for password strength, etc.
    default:
      return ''
  }
}

export const getFormErrors = (data) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = getInputError(key, value)
    return acc
  }, {})
}

export const sanitizeInput = (input) => {
  let sanitized = input.replace(/<[^>]*>/g, '')
  sanitized = String(sanitized).trim()
  return sanitized
}

export const sanitizeFormData = (formData) => {
  const sanitizedData = {}
  for (const [key, value] of Object.entries(formData)) {
    sanitizedData[key] = sanitizeInput(value)
  }

  return sanitizedData
}

export const deriveHeaderState = (routeName) => {
  const isSignup = routeName === 'signup'
  return {
    ctaText: isSignup ? MEMBER_QUESTION : NON_MEMBER_QUESTION,
    ctaUrl: isSignup ? '/login' : '/signup',
    ctaAnchorText: isSignup ? 'Log in' : 'Sign up'
  }
}
