import React from 'react'
import { togglePostSave } from '../helpers/api'
//import { useParams } from 'react-router-dom'

const PostSave = ({ id, isSaved, setIsSaved }) => {
  const handleClick = async () => {
    try {
      const data = await togglePostSave(id)
      console.log('wwwww', !!data)
      setIsSaved(!!data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button className="save-button" style={{backgroundColor: isSaved? '#9883e5' : 'white', color: isSaved? 'white' : '#9883e5'}} onClick={handleClick}>{isSaved ? 'Saved' : 'Save'}</button>
    </div>
  )
}

export default PostSave
