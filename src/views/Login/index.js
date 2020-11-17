import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import { Redirect } from 'react-router-dom'

function Login(props) {
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const handleUid = (event) => {
    const value = event.target.value
    setUid(value)
    console.log(uid)
  }
  const handlePassword = (event) => {
    const value = event.target.value
    setPassword(value)
    console.log(password)
  }
  const postData = async (url, payload) => {
    axios
      .post(url, payload)
      .then((response) => {
        const { data } = response
        let { token } = data
        localStorage.setItem('token', token)
        setRedirect(true)
      })
      .catch((error) => error)
  }
  const handleLogin = (event) => {
    event.preventDefault()
    postData('http://localhost:5000/api/user/login', { uid, password })
  }
  if (redirect) return <Redirect to='/home' />

  return (
    <div className='main-container'>
      <div className='left-section'>
        <div className='left-container'>
          <span>Welcome to</span>
          <h1>Classblock</h1>
          <h2>Login</h2>
          <div className='tab-row'>
            <div className='tab active'>Student</div>
            <div className='tab'>Teacher</div>
          </div>
          <form>
            <input
              type='text'
              placeholder='Enrollment'
              value={uid}
              onChange={handleUid}
            ></input>
            <input
              type={visible ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={handlePassword}
            ></input>
            <div className='show-password'>
              <span
                onClick={() => {
                  setVisible(!visible)
                }}
              >
                Show Password
              </span>
            </div>
            <button onClick={handleLogin}>Sign In</button>
          </form>
          Don’t have an account?
          <a href='/'>Sign up!</a>
        </div>
      </div>
    </div>
  )
}

export default Login
