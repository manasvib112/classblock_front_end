import React from 'react'
import './style.css'
import image from '../../../src/asset/images/images.png'
import profile from '../../../src/asset/images/profile.jpeg'
import {
  Notifications,
  HomeRounded,
  PeopleAltRounded,
  PersonRounded
} from '@material-ui/icons'

export default function Header(props) {
  const name = typeof props.user === 'string' ? props.user.split(' ') : ['']
  const firstname = name[0]
  return (
    <div className='header'>
      <div className='left-section'>
        <img src={image} alt='classblock-logo' />
        <input className='search-bar' type='text' placeholder='Search'></input>
      </div>
      <div className='middle-section'>
        <Notifications fontSize='large' />
        <HomeRounded fontSize='large' />
        <PeopleAltRounded fontSize='large' />
        <PersonRounded fontSize='large' />
      </div>
      <div className='right-section'>
        <div className='text-section'>
          <span>Hi</span>
          {firstname}
        </div>
        <div className='img-section'>
          <img src={profile} alt='profile' />{' '}
        </div>
      </div>
    </div>
  )
}
