import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import HomePage from './views/HomePage'
import MyClass from './views/MyClass'
import ClassRoom from './views/Classroom'

const Routing = () => {
  return (
    <Router>
      <Route component={Login} path='/' exact />
      <Route component={Register} path='/register' exact />
      <Route component={HomePage} path='/home' exact />
      <Route component={MyClass} path='/my-classes' exact />
      <Route component={ClassRoom} path='/classroom/:id' />
    </Router>
  )
}

export default Routing
