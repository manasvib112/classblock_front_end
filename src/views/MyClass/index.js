import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import ClassCard from '../../components/ClassCard'
import { isEmpty } from 'lodash'
import Axios from 'axios'
import './style.css'
import { ClassCardSkeleton } from '../Skeleton'

export default function MyClass(props) {
  console.log(props)
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  const [classRoomData, setClassRoomData] = useState([])
  useEffect(() => {
    if (isEmpty(classRoomData) && !isEmpty(userData)) {
      Axios.get(
        `http://localhost:5000/api/classroom/get-user-classrooms/${userData.id}`,
        { headers: { Authorization: localStorage['token'] } }
      )
        .then((response) => {
          setClassRoomData(response.data.classes)
          console.log(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error, Object.assign({}, error))
          setLoading(false)
        })
    }
  }, [classRoomData])

  const [loading, setLoading] = useState(true)
  return (
    <div className='classroom-wrapper'>
      <div className='classroom-container'>
        <Header user={userData ? userData.name : ''} />
        <div className='classroom-main'>
          <h1 className='title'>Classes</h1>
          <div className='classroom-list'>
            {!isEmpty(classRoomData)
              ? classRoomData.map((classroom) => (
                  <ClassCard classroom={classroom} />
                ))
              : null}
            {!loading && isEmpty(classRoomData) ? (
              <h2 className='subtitle'>You are not registered in any class</h2>
            ) : null}
            {loading ? (
              <>
                <ClassCardSkeleton />
                <ClassCardSkeleton />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
