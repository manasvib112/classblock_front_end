import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import profile from '../../../src/asset/images/profile.png'
import { PhotoLibrary, InsertEmoticon, HelpOutline } from '@material-ui/icons'
import axios from 'axios'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export default function Author({ total, setTotal, classId }) {
  const fileUploader = useRef(null)
  const [isQuery, setIsQuery] = useState(false)
  const [post, setPost] = useState('')
  const [focus, setFocus] = useState(false)
  const [media, setMedia] = useState(null)
  const [cdn, setCdn] = useState('')

  useEffect(() => {
    if (media) {
      setCdn(URL.createObjectURL(media))
    }
  }, [media])
  const handlePost = (event) => {
    setPost(event.target.value)
  }
  const handleFocus = () => {
    setFocus(true)
  }
  const handleBlur = () => {
    if (post.length < 2) setFocus(false)
  }
  const handleMediaClick = (event) => {
    // event.preventDefault()
    console.log(event.target.files[0])
    setMedia(event.target.files[0])
  }
  const uploadPost = (media = '') => {
    console.log({ content: post, media })
    axios
      .post(
        'http://localhost:5000/api/classroom/add-post',
        { content: post, media, isQuery, class: classId },
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
  const handleClick = (event) => {
    event.preventDefault()
    if (media) {
      const data = new FormData()
      console.log('media to be uploaded', media)
      data.append('file', media)
      data.append('upload_preset', 'classblock')
      data.append('cloudname', 'classblock')
      for (var [key, value] of data.entries()) {
        console.log(key, value)
      }
      fetch('https://api.cloudinary.com/v1_1/classblock/image/upload', {
        method: 'post',
        body: data
      })
        .then((response) => {
          response
            .json()
            .then((result) => {
              console.log(result.url)
              uploadPost(result.url)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      uploadPost()
    }
    setMedia(null)
  }
  return (
    <div className='class author'>
      <div className='class author-top'>
        <img
          className='profile'
          src={
            localStorage.userData && JSON.parse(localStorage.userData).image
              ? JSON.parse(localStorage.userData).image
              : profile
          }
          alt='profile'
        />
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
          {media ? (
            <div className='thumbnail'>
              <img src={cdn} alt='upload' />
            </div>
          ) : null}
          <div className='button-row'>
            <button onClick={handleClick}>Post</button>
          </div>
        </form>
      </div>
      <div className='author-bottom'>
        <div
          className='photo-option'
          onClick={() => fileUploader.current.click()}
        >
          <PhotoLibrary />
          <span>Photo/Video</span>
          <input
            ref={fileUploader}
            type='file'
            style={{ display: 'none' }}
            onChange={handleMediaClick}
          ></input>
        </div>
        <div
          className={isQuery ? 'activity-option active' : 'activity-option'}
          onClick={() => {
            setIsQuery(!isQuery)
          }}
        >
          <HelpOutline />
          <span>Post as a Doubt</span>
        </div>
      </div>
    </div>
  )
}
