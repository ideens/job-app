import axios from 'axios'

export const getPosts = async () => {
  try {
    const response = await axios.get('/api/posts')
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get('/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(token)
    console.log(response.data.firstName)
    return response.data.firstName
  } catch (err) {
    console.log(err)
  }
}

export const getSinglePost = async (id) => {
  const token = localStorage.getItem('token')

  try {
    const { data } = await axios.get(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(data)
    data.technologies = data.technologies.map((t) => {
      return { value: t, label: t }
    })
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.get(`/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('PROFILE DATA =>', data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export const togglePostSave = async (id) => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.put(`/api/saved/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('SAVED POST- ', data)
    return data
  } catch (err) {
    console.log(err)
  }
}
