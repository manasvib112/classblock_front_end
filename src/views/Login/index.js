import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import Error from '../../components/Error'
import { isEmpty } from 'lodash'

function Login(props) {
  const [error, setError] = useState({})
  const [role, setRole] = useState('student')
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const history = useHistory()
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
        console.log(response)
        const { data } = response
        let { token } = data
        console.log(data)
        localStorage.setItem('token', token)
        history.push('/home')
      })
      .catch((error) => {
        // debugger
        console.error(Object.assign({}, error))
        if (error.response) {
          setError({
            unauthorized: `${
              error.response.data.error
                ? error.response.data.error
                : 'Invalid credentials'
            }`
          })
        } else {
          setError({
            server: 'Server error: timeout'
          })
        }
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
    } else {
      const err = error.uid ? delete error[uid] : error
      setError(err)
    }
    if (isEmpty(password)) {
      setError({
        ...error,
        ...{
          password: "password can't be blank"
        }
      })
      return
    } else {
      const err = error.password ? delete error[password] : error
      setError(err)
    }
    postData('http://localhost:5000/api/user/login', { uid, password })
  }

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
            {error.server ? <Error text={error.server} /> : null}
            {error.password ? <Error text={error.password} /> : null}

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
