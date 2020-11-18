import React from 'react'
import './style.css'
import { Popover, Typography, Button } from '@material-ui/core'
import image from '../../../src/asset/images/images.png'
import profile from '../../../src/asset/images/profile.jpeg'
import { isEmpty } from 'lodash'
import {
  Notifications,
  HomeRounded,
  PeopleAltRounded,
  PersonRounded
} from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'

export default function Header() {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const history = useHistory()
  const name = isEmpty(userData) ? [''] : userData.name.split(' ')
  const id = isEmpty(userData) ? '' : userData.id
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const firstname = name[0]
  const open = Boolean(anchorEl)
  const pop = open ? 'simple-popover' : undefined
  const logout = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <div className='header'>
      <div className='left-section'>
        <img src={image} alt='classblock-logo' />
        <input className='search-bar' type='text' placeholder='Search'></input>
      </div>
      <div className='middle-section'>
        <Notifications fontSize='large' />
        <HomeRounded fontSize='large' />
        <Link style={{ color: '#000' }} to={`/classroom/id=${id}`}>
          <PeopleAltRounded fontSize='large' />
        </Link>
        <PersonRounded fontSize='large' />
      </div>
      <div className='right-section'>
        <div className='text-section'>
          <span>Hi</span>
          {firstname}
        </div>
        <div className='img-section'>
          <img src={profile} alt='profile' onClick={handleClick} />{' '}
          <Popover
            id={pop}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Typography className={{ padding: '2rem', height: '100px' }}>
              <Button onClick={logout}>Logout</Button>
            </Typography>
          </Popover>
        </div>
      </div>
    </div>
  )
}
