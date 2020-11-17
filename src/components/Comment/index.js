import React from 'react'
import './style.css'
import profile from '../../../src/asset/images/profile.jpeg'

export default function Comment(props) {
  const details = '-'
  return (
    <div className='comment-container'>
      <img src={props.profile ? props.profile : profile} alt='profile'></img>
      <div className='comment-section'>
        <span className='name'>{props.name}</span>
        <span className='details'>{details}</span>
        {props.body}
      </div>
    </div>
  )
}
