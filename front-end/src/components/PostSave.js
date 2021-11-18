import React from 'react'
import { togglePostSave } from '../helpers/api'
//import { useParams } from 'react-router-dom'

const PostSave = ({ id, isSaved, setIsSaved }) => {
  const handleClick = async () => {
    try {
      const data = await togglePostSave(id)
      console.log(!!data)
      setIsSaved(!!data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>{isSaved ? 'Saved' : 'Save'}</button>
    </div>
  )
}

export default PostSave
