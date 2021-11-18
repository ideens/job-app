import React from 'react'
import { togglePostSave } from '../helpers/api'
import { useParams } from 'react-router-dom'

const PostSave = () => {
  const { id } = useParams()

  const handleClick = () => {
    togglePostSave(id)
  }

  return (
    <div>
      <button onClick={handleClick}>Save</button>
    </div>
  )
}

export default PostSave
