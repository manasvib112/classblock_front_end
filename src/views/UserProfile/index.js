import { TextField } from '@material-ui/core'
import Axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import isEmpty from 'lodash'
import Header from '../../components/Header'
import './style.css'

export default function UserProfile() {
  const [userData, setUserData] = useState({})
  const [source, setSource] = useState(
    'https://res.cloudinary.com/classblock/image/upload/v1607721001/classblock/pfdfwqnlvqb9lftwetzt.jpg'
  )
  const [media, setMedia] = useState(null)
  const fileUploader = useRef(null)
  useEffect(() => {
    if (isEmpty(userData)) {
      Axios.get('http://localhost:5000/api/user/user-profile', {
        headers: { Authorization: localStorage.token }
      })
        .then((response) => {
          if (response) {
            console.log(response.data)
            const { name, username, email, uid } = response.data.payload
            setUserData({ name, username, email, uid })
          }
        })
        .catch((error) => {
          console.log(Object.assign({}, error))
        })
    }
  }, [])

  const updateImage = (image) => {
    Axios.put('http://localhost:5000/api/user/profile-image', {
      headers: { Authorization: { token: localStorage.token } },
      body: { image }
    })
      .then((response) => {
        if (response) {
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(Object.assign({}, error))
      })
  }

  const saveChanges = () => {
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
              updateImage(result.url)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const uploadImage = (e) => {
    console.log(e.target.files[0])
    setMedia(e.target.files[0])
    setSource(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div>
      <Header />
      <div className='user-profile-container'>
        <div className='user-profile-form'>
          <div className='user-profile-image'>
            <input
              type='file'
              ref={fileUploader}
              style={{ display: 'none' }}
              onChange={uploadImage}
            ></input>
            <div className='user-profile-image-wrapper'>
              <img src={source} alt='profile'></img>
              <div
                className='image-uploader'
                onClick={() => {
                  console.log('clicked')
                  fileUploader.current.click()
                }}
              >
                Upload Image
              </div>
            </div>
          </div>
          <h2 className='subtitle'>Personal</h2>
          <div className='user-profile-section'>
            <TextField
              disabled
              id='standard-multiline-flexible'
              style={{ margin: '5px 0' }}
              fullWidth
              variant='outlined'
              multiline
              value={userData.name}
            />
            <TextField
              disabled
              id='standard-multiline-flexible'
              style={{ margin: '5px 0' }}
              fullWidth
              variant='outlined'
              multiline
              value={userData.uid}
            />
            <TextField
              disabled
              id='standard-multiline-flexible'
              style={{ margin: '5px 0' }}
              fullWidth
              variant='outlined'
              multiline
              value={userData.email}
            />
            <TextField
              disabled
              id='standard-multiline-flexible'
              style={{ margin: '5px 0' }}
              fullWidth
              variant='outlined'
              multiline
              value={userData.username}
            />
          </div>
          <div className='button-row'>
            <div className='save' onClick={saveChanges}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
