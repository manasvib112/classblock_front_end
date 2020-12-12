import React from 'react'
import './style.css'
export default function Error({ text = 'Error message shown here' }) {
  return <div className='error-container'>{text}</div>
}
