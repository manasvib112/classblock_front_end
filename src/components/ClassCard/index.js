import { Avatar } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import React from 'react'
import './style.css'

export default function index({ classroom }) {
  return (
    <div className='class-card-container'>
      <h1>{classroom.name} </h1>
      {/* <h2>{classroom}</h2> */}
      <div>
        {classroom.schedule.map((time) => (
          <span className='class-time'>
            {time.day} {time.time}
          </span>
        ))}
      </div>
      <div className='info-bar'>
        <div className='students'>
          <span>Students</span>
          <AvatarGroup max={3}>
            {classroom.students.map((student) =>
              student ? (
                <Avatar key={student.id}>{student.name[0]}</Avatar>
              ) : null
            )}
          </AvatarGroup>
        </div>
        <Link style={{ color: '#000' }} to={`/classroom/${classroom._id}`}>
          <button>Enter Class</button>
        </Link>
      </div>
    </div>
  )
}
