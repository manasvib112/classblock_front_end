import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import HomePage from './views/HomePage'
import MyClass from './views/MyClass'
import ClassRoom from './views/Classroom'
import UserProfile from './views/UserProfile'

const Routing = () => {
  return (
    <Router>
      <Route component={Login} path='/' exact />
      <Route component={Register} path='/register' exact />
      <Route component={HomePage} path='/home' exact />
      <Route component={MyClass} path='/my-classes' exact />
      <Route component={UserProfile} path='/profile' exact />
      <Route component={ClassRoom} path='/classroom/:id' exact />
    </Router>
  )
}

export default Routing
