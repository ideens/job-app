import React, { useState } from 'react'
import { savePost, unsavePost } from '../helpers/api'
import { useParams } from 'react-router-dom'

const PostSave = () => {
  const [postSaved, setPostSaved] = useState(false)
  const { id, saveId } = useParams()

  const handleClick = () => {
    console.log('CLICK ID - ', id)
    savePost(id)
    setPostSaved(true)
  }

  const handleUnclick = () => {
    unsavePost(id, saveId)
    setPostSaved(false)
  }

  return (
    <div>
      {!postSaved ? (
        <button onClick={handleClick}>Save</button>
      ) : (
        <button onClick={handleUnclick}>Unsave</button>
      )}
    </div>
  )
}

export default PostSave
