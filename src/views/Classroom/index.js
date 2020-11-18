import React from 'react'
import Header from '../../components/Header'
export default function ClassRoom(props) {
  console.log(props)
  return (
    <div>
      <Header user={localStorage.getItem('userData').name} />
      <h1>Welcome to classroom</h1>
    </div>
  )
}
