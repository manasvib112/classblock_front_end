import React, { useState } from 'react'
import './style.css'
import profile from '../../../src/asset/images/profile.jpeg'
import axios from 'axios'

export default function NewComment({ total, setTotal, id }) {
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
      .put(
        'http://localhost:5000/api/post/add-comment',
        { content: post, id },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      )
      .then((response) => {
        console.log(response)
        setTotal(total + 1)
        setPost('')
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className='new-comment'>
      <div className='new-comment-top'>
        <img src={profile} alt='profile' />
        <form>
          <textarea
            type='text'
            placeholder='Comment...'
            className={focus ? 'active' : ''}
            value={post}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handlePost}
          ></textarea>
          {post.length >= 1 ? (
            <div className='button-row'>
              <button onClick={handleClick}>Post</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  )
}
