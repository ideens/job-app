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
