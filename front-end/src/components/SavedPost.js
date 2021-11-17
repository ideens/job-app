
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const savedPost = ({ isSaved }) => {

const handleSavedPost = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(`/api/posts/${id}`,{
          post: post.id,
          saved: true,
      },
       { headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      navigate('/landing')
      await getPosts()
    }catch(err) {
      console.log(err)
    }
  }

  const userId = getuserID()
  const saved = post && post.join.find((post) => post.owner === userId)
  const hasUserSavedPost = userID && !!saved
  console.log(`user saved post ${hasUserSavedPost}`)

  const handleRemovePost = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await axios.delete(`/api/posts/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      navigate('/landing')
      await getPosts()
    }catch(err) {
      console.log(err)
    }
  }
  return (
        
        <>

     <Card>

          <Saving>
          { hasUserSavedPost
            ?' You already saved'
            : 'You have not saved yet'
            
        }
        </Saving>

        <Saving> Post Saved </Saving>

        { hasUserSavedPost ? (
            <Saving onclick ={() => handleRemovepost (post.id)}> Remove </Saving>
            ) : (
                <Saving onclick ={ handleSavedPost } > Save </Saving>
                )
                
            }
      </Card>
     
            </>
  )
        }


export default savedPost