import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import { Link, Redirect } from 'react-router-dom'
import Error from '../../components/Error'
import { isEmpty } from 'lodash'

function Login(props) {
  const [error, setError] = useState({})
  const [role, setRole] = useState('student')
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const handleUid = (event) => {
    const value = event.target.value
    setUid(value)
  }
  const handlePassword = (event) => {
    const value = event.target.value
    setPassword(value)
  }
  const postData = async (url, payload) => {
    axios
      .post(url, payload)
      .then((response) => {
        const { data } = response
        let { token } = data
        console.log(data)
        localStorage.setItem('token', token)
        setRedirect(true)
      })
      .catch((error) => {
        console.log(error.response)
        setError({
          unauthorized: `${
            error.response.data.error
              ? error.response.data.error
              : 'Invalid credentials'
          }`
        })
      })
  }
  const handleLogin = (event) => {
    event.preventDefault()
    if (isEmpty(uid)) {
      setError({
        ...error,
        ...{
          uid: `${
            role === 'student' ? 'Enrollment' : 'Employee ID'
          } can't be blank`
        }
      })
      return
    }
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
            <div
              className={role === 'student' ? 'tab active' : 'tab'}
              onClick={() => setRole('student')}
            >
              Student
            </div>
            <div
              className={role === 'teacher' ? 'tab active' : 'tab'}
              onClick={() => setRole('teacher')}
            >
              Teacher
            </div>
          </div>
          <form>
            <input
              type='text'
              placeholder={role === 'student' ? 'Enrollment' : 'Employment ID'}
              value={uid}
              onChange={handleUid}
            ></input>
            {error.uid ? <Error text={error.uid} /> : null}
            <input
              type={visible ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={handlePassword}
            ></input>
            {error.unauthorized ? <Error text={error.unauthorized} /> : null}

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
          <Link to='/register'>Sign up!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
