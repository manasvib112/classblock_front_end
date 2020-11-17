import React, { useState } from 'react'
import './style.css'
import image from '../../../src/asset/images/images.png'
import profile from '../../../src/asset/images/profile.jpeg'
import { PhotoLibrary, InsertEmoticon } from '@material-ui/icons'
import axios from 'axios'

export default function Author({ total, setTotal }) {
  const [post, setPost] = useState('')
  const [focus, setFocus] = useState(false)
  const handlePost = (event) => {
    setPost(event.target.value)
  }
  const handleFocus = () => {
    setFocus(true)
  }
  const handleBlur = () => {
    if (post.length < 2) setFocus(false)
  }
  const handleClick = (event) => {
    event.preventDefault()
    axios
      .post(
        'http://localhost:5000/api/post/add',
        { content: post },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      )
      .then((response) => {
        setTotal(total + 1)
        setPost('')
      })
      .catch((error) => console.log(error))
  }
  const handleLike = (event) => {}
  return (
    <div className='author'>
      <div className='author-top'>
        <img src={profile} alt='profile' />
        <form>
          <textarea
            type='text'
            placeholder='Whats on your mind?'
            className={focus ? 'active' : ''}
            value={post}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handlePost}
          ></textarea>
          {post.length > 5 ? (
            <div className='button-row'>
              <button onClick={handleClick}>Post</button>
            </div>
          ) : null}
        </form>
      </div>
      <div className='author-bottom'>
        <div className='photo-option'>
          <PhotoLibrary />
          <span>Photo/Video</span>
        </div>
        <div className='activity-option'>
          <InsertEmoticon />
          <span>Feeling/Activity</span>
        </div>
      </div>
    </div>
  )
}
