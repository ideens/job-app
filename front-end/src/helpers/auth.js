// Here, we're using localStorage to persist the token
// in the browser upon page-loads and refreshes.

// We can set a new token, get it, or remove it.

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}
